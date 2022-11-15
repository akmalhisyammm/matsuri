const { StatusCodes } = require('http-status-codes');
const {
  getAllOrganizerUsers,
  getAllAdminUsers,
  createAdminUser,
  createOrganizerUser,
  updateOrganizerUser,
  updateAdminUser,
  deleteOrganizerUser,
  deleteAdminUser,
} = require('../../../services/mongoose/users');

const getOrganizers = async (req, res, next) => {
  try {
    const result = await getAllOrganizerUsers(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getAdmins = async (req, res, next) => {
  try {
    const result = await getAllAdminUsers(req);

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

const updateOrganizer = async (req, res, next) => {
  try {
    const result = await updateOrganizerUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const result = await updateAdminUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroyOrganizer = async (req, res, next) => {
  try {
    const result = await deleteOrganizerUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroyAdmin = async (req, res, next) => {
  try {
    const result = await deleteAdminUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrganizers,
  getAdmins,
  createOrganizer,
  createAdmin,
  updateOrganizer,
  updateAdmin,
  destroyOrganizer,
  destroyAdmin,
};
