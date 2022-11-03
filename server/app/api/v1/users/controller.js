const { StatusCodes } = require('http-status-codes');
const {
  getAllUsers,
  createAdminUser,
  createOrganizerUser,
} = require('../../../services/mongoose/users');

const index = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizerUser(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const result = await createAdminUser(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, createOrganizer, createAdmin };
