const { StatusCodes } = require('http-status-codes');
const { createOrganizer } = require('../../../services/mongoose/users');

const create = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
