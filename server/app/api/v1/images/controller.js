const { StatusCodes } = require('http-status-codes');
const { createImage } = require('../../../services/mongoose/images');

const create = async (req, res, next) => {
  try {
    const result = await createImage(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
