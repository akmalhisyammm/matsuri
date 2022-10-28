const express = require('express');
const { index, create } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('owner'), index);
router.post('/', authenticateUser, authorizeRoles('organizer'), create);

module.exports = router;
