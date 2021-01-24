const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    index: function(req,res,next){
        const token = req.cookies.user;
        if(token){
            const UserTokenData = jwt.decode(token, process.env.TOKEN_SECRET_KEY);
            User.findOne({ username: UserTokenData.user }).then(user => {
                res.render("dashboard", {
                    title: "Trang quản trị TaiGameTool",
                    css: ['dashboard'],
                    user
                });
            }).catch(err => next);
        }else{
            res.redirect('/login')
        }
    }
}