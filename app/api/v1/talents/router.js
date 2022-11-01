const express = require('express');
const { index, find, create, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('Organizer'), index);
router.post('/', authenticateUser, authorizeRoles('Organizer'), create);

router.get('/:id', authenticateUser, authorizeRoles('Organizer'), find);
router.put('/:id', authenticateUser, authorizeRoles('Organizer'), update);
router.delete('/:id', authenticateUser, authorizeRoles('Organizer'), destroy);

module.exports = router;
