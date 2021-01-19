const express = require('express');
const router = express.Router();
const controller = require('../controller/siteController');


router.post('/login', controller.login_post);
router.post('/register', controller.register_post);
router.get('/login', controller.login_get);
router.get('/register', controller.register_get);
router.get('/', controller.home);

module.exports = router;