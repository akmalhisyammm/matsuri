const RefreshToken = require('../../api/v1/refresh-token/model');
const Users = require('../../api/v1/users/model');
const { NotFoundError } = require('../../errors');
const { createUserPayload, decodeRefreshToken, generateToken } = require('../../utils');

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;

  const result = await RefreshToken.findOne({ refreshToken });

  if (!result) {
    throw new NotFoundError('Invalid refresh token.');
  }

  const payload = decodeRefreshToken(result.refreshToken);

  const user = await Users.findOne({ email: payload.email });

  const token = generateToken(createUserPayload(user));

  return token;
};

const createUserRefreshToken = async (payload) => {
  const result = await RefreshToken.create(payload);

  return result;
};

module.exports = { getUserRefreshToken, createUserRefreshToken };
