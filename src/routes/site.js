const express = require('express');
const router = express.Router();
const controller = require('../controller/siteController');

router.get('/', controller.home);

module.exports = router;