const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.GMAIL_PASSWORD,
};
