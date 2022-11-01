const Payments = require('../../api/v1/payments/model');
const { getImageById } = require('./images');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllPayments = async (req) => {
  const { organizer } = req.user;

  const result = await Payments.find({ organizer })
    .populate({ path: 'image', select: '_id name' })
    .select('_id type status image');

  return result;
};

const getPaymentById = async (id) => {
  const result = await Payments.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No payments found with id ${id}`);
  }

  return result;
};

const getPaymentByIdAndOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Payments.findOne({ _id: id, organizer })
    .populate({ path: 'image', select: '_id name' })
    .select('_id type status image');

  if (!result) {
    throw new NotFoundError(`No payments found with id ${id}`);
  }

  return result;
};

const createPayment = async (req) => {
  const { type, imageId } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);

  const check = await Payments.findOne({ type, organizer });

  if (check) {
    throw new BadRequestError('Payment type already exist.');
  }

  const result = await Payments.create({ type, image: imageId, organizer });

  return result;
};

const updatePayment = async (req) => {
  const { id } = req.params;
  const { type, imageId } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);

  const check = await Payments.findOne({ _id: { $ne: id }, type, organizer });

  if (check) {
    throw new BadRequestError('Payment type already exist.');
  }

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, image: imageId, organizer },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`No payments found with id ${id}`);
  }

  return result;
};

const deletePayment = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Payments.findOneAndRemove({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError(`No payments found with id ${id}`);
  }

  return result;
};

module.exports = {
  getAllPayments,
  getPaymentById,
  getPaymentByIdAndOrganizer,
  createPayment,
  updatePayment,
  deletePayment,
};
