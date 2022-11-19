const express = require('express');
const { index, updateStatus } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('Owner', 'Organizer', 'Admin'), index);

router.put(
  '/:id/status',
  authenticateUser,
  authorizeRoles('Owner', 'Organizer', 'Admin'),
  updateStatus
);

module.exports = router;
