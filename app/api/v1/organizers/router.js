const express = require('express');
const { create } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.post('/', authenticateUser, authorizeRoles('owner'), create);

module.exports = router;
