const url = require('url');
const title = {
    loginSite: 'Đăng nhập',
    registerSite: 'Đăng ký',
    home: 'Chào mừng đến với TaiGameTool'
}
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    home: function(req,res) {
        res.render('index', {
            title: title.home
        })
    },
    dashboard: function(req,res) {
        res.render('dashboard');
    },
    login_get: function(req,res) {
        res.render('login',{
            title: title.loginSite
        })
    },
    register_get: function(req,res) {
        res.render('register',{
            title: title.registerSite
        })
    },
    login_post: function (req, res) {
        User.findOne({username: req.body.username}).then(user => {
            if(user){
                // Compare username's password
                bcrypt.compare(req.body.password,user.password).then(result => {
                    if(!result){
                        return res.render('login', {
                            title: title.loginSite,
                            msg: {
                                type: 'danger',
                                value: 'Sai mật khẩu'
                            }
                        });
                    }else{
                        // Login success
                        const token = jwt.sign({ user: user.username }, process.env.TOKEN_SECRET_KEY , { expiresIn: '1d' });
                        const cookieOption = {
                            expires: new Date(
                                Date.now() + 1 * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        };
                        res.cookie('user',token,cookieOption);
                        res.redirect('/dashboard');
                    }
                }).catch(err => {
                    console.log(err);
                    return res.render('login', {
                        title: title.loginSite,
                        msg: {
                            type: 'danger',
                            value: 'Có lỗi xảy ra'
                        }
                    })
                })
            }else{
                return res.render('login', {
                    title: title.loginSite,
                    msg: {
                        type: 'danger',
                        value: 'Tài khoản không tồn tại'
                    }
                })
            }
        })
    },
    register_post: function (req, res) {
        const {firstName, lastName, displayName, username, password, rePassword} = req.body;
        User.find({username: username}).then((users) => {
            if(users.length){
                return res.render('register', {
                    title: title.registerSite,
                    formData: {
                        firstName: firstName,
                        lastName: lastName
                    },
                    msg: {
                        type: 'warning',
                        value: 'Tài khoản đã tồn tại'
                    }
                });
            } else if (password !== rePassword) {
                return res.render('register', {
                    title: title.registerSite,
                    formData: {
                        firstName: firstName,
                        lastName: lastName,
                        username: username
                    },
                    msg: {
                        type: 'warning',
                        value: 'Mật khẩu xác nhận không khớp'
                    }
                });
            }else {
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) return res.json({ error });
                    let user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        displayName: req.body.firstName + ' ' + req.body.lastName,
                        username: req.body.username,
                        password: hashedPassword
                    });
                    user.save().then(() => {
                        // Register successful
                        return res.redirect('/');
                    }).catch(err => {
                        // Register failed
                        const alert = {
                            type: 'danger',
                            value: 'Đăng ký không thành công'
                        }
                        return res.render('register', {
                            title: title.registerSite,
                            msg: alert
                        });
                    })
                });
            }
        }).catch(err => res.render('register', {
            title: title.registerSite,
            msg: {
                type: 'danger',
                value: 'Đã xảy ra lỗi'
            }
        }));
    }
}