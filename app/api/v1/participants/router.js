const express = require('express');
const {
  index,
  detail,
  signUp,
  signIn,
  activate,
  dashboard,
  payments,
  checkout,
} = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/', index);
router.get('/:id', detail);

router.post('/auth/sign-up', signUp);
router.post('/auth/sign-in', signIn);
router.put('/auth/activate', activate);

router.get('/orders', authenticateParticipant, dashboard);

router.get('/payments/:organizer', authenticateParticipant, payments);

router.post('/checkout', authenticateParticipant, checkout);

module.exports = router;
