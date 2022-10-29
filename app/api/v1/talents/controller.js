const { StatusCodes } = require('http-status-codes');
const {
  getAllTalents,
  getTalentByIdAndOrganizer,
  createTalent,
  updateTalent,
  deleteTalent,
} = require('../../../services/mongoose/talents');

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getTalentByIdAndOrganizer(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createTalent(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalent(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalent(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, create, update, destroy };
