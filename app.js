const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./app/api/v1/auth/router');
const organizersRouter = require('./app/api/v1/organizers/router');
const refreshTokenRouter = require('./app/api/v1/refresh-token/router');
const usersRouter = require('./app/api/v1/users/router');

const errorHandlerMiddleware = require('./app/middlewares/error-handler');
const notFoundMiddleware = require('./app/middlewares/not-found');

const BASE_URL_V1 = '/api/v1';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Matsuri API!',
  });
});

app.use(`${BASE_URL_V1}/cms/auth`, authRouter);
app.use(`${BASE_URL_V1}/cms/organizers`, organizersRouter);
app.use(`${BASE_URL_V1}/cms/refresh-token`, refreshTokenRouter);
app.use(`${BASE_URL_V1}/cms/users`, usersRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
