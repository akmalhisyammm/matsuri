const Users = require('../../api/v1/users/model');
const { createUserRefreshToken } = require('./refreshToken');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const {
  createUserPayload,
  generateToken,
  generateRefreshToken,
} = require('../../utils');

const handleSignIn = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password.');
  }

  const result = await Users.findOne({ email });

  if (!result) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials.');
  }

  const token = generateToken(createUserPayload(result));
  const refreshToken = generateRefreshToken(createUserPayload(result));

  await createUserRefreshToken({ refreshToken, user: result._id });

  return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { handleSignIn };
