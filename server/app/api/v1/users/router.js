const express = require('express');
const { index, create } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('Owner'), index);
router.post('/', authenticateUser, authorizeRoles('Organizer'), create);

module.exports = router;
