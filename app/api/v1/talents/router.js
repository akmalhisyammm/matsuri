const express = require('express');
const { index, find, create, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('organizer'), index);
router.post('/', authenticateUser, authorizeRoles('organizer'), create);

router.get('/:id', authenticateUser, authorizeRoles('organizer'), find);
router.put('/:id', authenticateUser, authorizeRoles('organizer'), update);
router.delete('/:id', authenticateUser, authorizeRoles('organizer'), destroy);

module.exports = router;
