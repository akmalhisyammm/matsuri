const jwt = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExpiration,
} = require('../config');

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });

  return token;
};
const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });

  return token;
};

const decodeToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);

  return payload;
};

const decodeRefreshToken = (token) => {
  const payload = jwt.verify(token, jwtRefreshTokenSecret);

  return payload;
};

module.exports = {
  generateToken,
  generateRefreshToken,
  decodeToken,
  decodeRefreshToken,
};
