const url = require('url');
const title = {
    loginSite: 'Đăng nhập',
    registerSite: 'Đăng ký',
    home: 'Chào mừng đến với TaiGameTool'
}
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    home: function(req,res) {
        res.render('index', {
            title: title.home
        })
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
        res.render('login', {
            title: title.loginSite,
            msg: {
                type: 'info',
                value: 'Hello'
            }
        })
    },
    register_post: function (req, res) {
        const {firstName, lastName, displayName, username, password, rePassword} = req.body;
        User.find({username: username}).then((users) => {
            console.log(users);
            if(users.length){
                res.render('register', {
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
            }
        }).catch(err => res.render('register', {
            title: title.registerSite,
            msg: {
                type: 'danger',
                value: 'Đã xảy ra lỗi'
            }
        }));
        // if (password !== rePassword) {
        //     res.render('register', {
        //         title: title.registerSite,
        //         msg: {
        //             type: 'warning',
        //             formData: {
        //                 firstName: firstName,
        //                 lastName: lastName,
        //                 username: username
        //             },
        //             value: 'Mật khẩu xác nhận không khớp'
        //         }
        //     });
        // }
        // bcrypt.hash(req.body.password, 10, (err,hashedPassword) => {
        //     if(err) return res.json({error});
        //     let user = new User({
        //         firstName: req.body.firstName,
        //         lastName: req.body.lastName,
        //         displayName: req.body.firstName + ' ' + req.body.lastName,
        //         username: req.body.username,
        //         password: hashedPassword
        //     });
        //     user.save().then(() => {
        //         // Register successful
        //         return res.redirect('/');
        //     }).catch(err => {
        //         // Register failed
        //         const alert = {
        //             type: 'danger',
        //             value: 'Đăng ký không thành công'
        //         }
        //         return res.render('register', {
        //             title: title.registerSite,
        //             msg: alert
        //         });
        //     })
        // });
    }
}