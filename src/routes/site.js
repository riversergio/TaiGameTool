const express = require('express');
const router = express.Router();
const controller = require('../controller/siteController');
const auth = require('../middlewares/auth');
const redirect = function(req, res, next){
    if(req.cookies.user){
        res.redirect('/dashboard')
    }else{
        next();
    }
}

router.post('/login',controller.login_post);
router.post('/register', controller.register_post);
router.get('/login', redirect,controller.login_get);
router.get('/register', redirect, controller.register_get);
router.get('/',redirect, controller.home);

module.exports = router;