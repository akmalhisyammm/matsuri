const { StatusCodes } = require('http-status-codes');
const {
  getAllOrganizers,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
} = require('../../../services/mongoose/organizers');

const index = async (req, res, next) => {
  try {
    const result = await getAllOrganizers();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateOrganizer(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteOrganizer(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create, update, destroy };
