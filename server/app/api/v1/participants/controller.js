const { StatusCodes } = require('http-status-codes');
const {
  handleSignUp,
  handleSignIn,
  activateAccount,
  getAllEvents,
  getEventById,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer,
} = require('../../../services/mongoose/participants');

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const detail = async (req, res, next) => {
  try {
    const result = await getEventById(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const result = await handleSignUp(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await handleSignIn(req);

    res.status(StatusCodes.OK).json({ data: { token: result } });
  } catch (err) {
    next(err);
  }
};

const activate = async (req, res, next) => {
  try {
    const result = await activateAccount(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const dashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const payments = async (req, res, next) => {
  try {
    const result = await getAllPaymentsByOrganizer(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  detail,
  signUp,
  signIn,
  activate,
  dashboard,
  checkout,
  payments,
};
