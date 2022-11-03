const express = require('express');
const { index, createAdmin, createOrganizer } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('Owner'), index);
router.post('/organizer', authenticateUser, authorizeRoles('Owner'), createOrganizer);
router.post('/admin', authenticateUser, authorizeRoles('Organizer'), createAdmin);

module.exports = router;
