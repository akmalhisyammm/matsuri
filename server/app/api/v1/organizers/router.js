const express = require('express');
const { index, create, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('Owner'), index);
router.post('/', authenticateUser, authorizeRoles('Owner'), create);

router.put('/:id', authenticateUser, authorizeRoles('Owner'), update);
router.delete('/:id', authenticateUser, authorizeRoles('Owner'), destroy);

module.exports = router;
