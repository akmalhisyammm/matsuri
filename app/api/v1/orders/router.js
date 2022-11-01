const express = require('express');
const { index } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get(
  '/',
  authenticateUser,
  authorizeRoles('Organizer', 'Admin', 'Owner'),
  index
);

module.exports = router;
