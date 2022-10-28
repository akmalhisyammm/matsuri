const { StatusCodes } = require('http-status-codes');
const { handleSignIn } = require('../../../services/mongoose/auth');

const signIn = async (req, res, next) => {
  try {
    const result = await handleSignIn(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn };
