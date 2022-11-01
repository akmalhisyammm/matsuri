const express = require('express');
const { create } = require('./controller');
const upload = require('../../../middlewares/multer');

const router = express.Router();

router.post('/', upload.single('avatar'), create);

module.exports = router;
