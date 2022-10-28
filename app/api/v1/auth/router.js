const express = require('express');
const { signIn } = require('./controller');

const router = express.Router();

router.post('/sign-in', signIn);

module.exports = router;
