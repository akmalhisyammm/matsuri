const express = require('express');
const {
  index,
  find,
  create,
  update,
  updateStatus,
  destroy,
} = require('./controller');
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

router.put(
  '/:id/status',
  authenticateUser,
  authorizeRoles('organizer'),
  updateStatus
);

module.exports = router;
