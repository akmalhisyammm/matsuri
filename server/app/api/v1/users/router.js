const express = require('express');
const {
  getOrganizers,
  getAdmins,
  createOrganizer,
  createAdmin,
  updateOrganizer,
  updateAdmin,
  destroyOrganizer,
  destroyAdmin,
} = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/organizers', authenticateUser, authorizeRoles('Owner'), getOrganizers);
router.post('/organizers', authenticateUser, authorizeRoles('Owner'), createOrganizer);

router.get('/admins', authenticateUser, authorizeRoles('Organizer'), getAdmins);
router.post('/admins', authenticateUser, authorizeRoles('Organizer'), createAdmin);

router.put('/organizers/:id', authenticateUser, authorizeRoles('Owner'), updateOrganizer);
router.delete('/organizers/:id', authenticateUser, authorizeRoles('Owner'), destroyOrganizer);

router.put('/admins/:id', authenticateUser, authorizeRoles('Organizer'), updateAdmin);
router.delete('/admins/:id', authenticateUser, authorizeRoles('Organizer'), destroyAdmin);

module.exports = router;
