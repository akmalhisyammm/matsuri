const { StatusCodes } = require('http-status-codes');
const { createOrganizerAndUser } = require('../../../services/mongoose/users');

const create = async (req, res, next) => {
  try {
    const result = await createOrganizerAndUser(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
