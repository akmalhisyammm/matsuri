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
  authorizeRoles('organizer', 'admin', 'owner'),
  index
);

module.exports = router;
