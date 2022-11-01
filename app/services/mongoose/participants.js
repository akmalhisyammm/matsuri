const Participant = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/orders/model');
const Payments = require('../../api/v1/payments/model');
const { otpMail } = require('../mail');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createParticipantPayload, generateToken } = require('../../utils');

const handleSignUp = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  let result = await Participant.findOne({ email, status: 'Inactive' });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.email = email;
    result.password = password;
    result.role = role;
    result.otp = Math.floor(Math.random() * 9999);

    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const handleSignIn = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password.');
  }

  const result = await Participant.findOne({ email });

  if (!result) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  if (result.status === 'Inactive') {
    throw new UnauthorizedError('Your account has not been activated.');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  const token = generateToken(createParticipantPayload(result));

  return token;
};

const activateAccount = async (req) => {
  const { otp, email } = req.body;

  const check = await Participant.findOne({ email });

  if (!check) {
    throw new NotFoundError(`Email ${email} is not registered.`);
  }

  if (check && check.otp !== otp) {
    throw new BadRequestError('OTP is not valid.');
  }

  const result = await Participant.findByIdAndUpdate(
    check._id,
    { status: 'Active' },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const getAllEvents = async () => {
  const result = await Events.find({ status: 'Published' })
    .populate('category')
    .populate('image')
    .select('_id title date venueName tickets');

  return result;
};

const getEventById = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate('category')
    .populate({ path: 'talent', populate: 'image' })
    .populate('image');

  if (!result) {
    throw new NotFoundError(`No events found with id ${id}.`);
  }

  return result;
};

const getAllOrders = async (req) => {
  const { id } = req.participant;

  const result = await Orders.find({ participant: id });

  return result;
};

const checkoutOrder = async (req) => {
  const { eventId, personalDetail, paymentId, tickets } = req.body;
  const { id } = req.participant;

  const event = await Events.findOne({ _id: eventId });

  if (!event) {
    throw new NotFoundError(`No events found with id ${eventId}.`);
  }

  const payment = await Payments.findOne({ _id: paymentId });

  if (!payment) {
    throw new NotFoundError(`No payment method found with id ${paymentId}.`);
  }

  let totalPay = 0;
  let totalOrderTicket = 0;

  await tickets.forEach((ticket) => {
    event.tickets.forEach((eventTicket) => {
      if (ticket.ticketCategories.type === eventTicket.type) {
        if (ticket.totalTicket > eventTicket.stock) {
          throw new NotFoundError('Ticket stock is not enough.');
        } else {
          eventTicket.stock -= ticket.totalTicket;
          totalOrderTicket += ticket.totalTicket;
          totalPay += ticket.ticketCategories.price * ticket.totalTicket;
        }
      }
    });
  });

  await event.save();

  const eventHistory = {
    title: event.title,
    date: event.date,
    about: event.about,
    tagline: event.tagline,
    keypoint: event.keypoint,
    venueName: event.venueName,
    tickets,
    image: event.image,
    category: event.category,
    talent: event.talent,
    organizer: event.organizer,
  };

  const result = new Orders({
    date: new Date(),
    personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: id,
    event,
    eventHistory,
    payment,
  });

  await result.save();

  return result;
};

const getAllPaymentsByOrganizer = async (req) => {
  const { organizer } = req.params;

  const result = await Payments.find({ organizer });

  return result;
};

module.exports = {
  handleSignIn,
  handleSignUp,
  activateAccount,
  getAllEvents,
  getEventById,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer,
};
