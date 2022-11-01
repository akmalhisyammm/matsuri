const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration, jwtRefreshSecret, jwtRefreshExpiration } = require('../config');

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });

  return token;
};
const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: jwtRefreshExpiration,
  });

  return token;
};

const decodeToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);

  return payload;
};

const decodeRefreshToken = (token) => {
  const payload = jwt.verify(token, jwtRefreshSecret);

  return payload;
};

module.exports = {
  generateToken,
  generateRefreshToken,
  decodeToken,
  decodeRefreshToken,
};
