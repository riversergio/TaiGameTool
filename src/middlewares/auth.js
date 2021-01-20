const jwt = require('jsonwebtoken');

require('dotenv').config();

async function authenicate(req, res, next) {
    try{
        const token = req.cookies.user;
        const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decode;
        next();
    }catch(e){
        res.redirect('/');
    }
}

module.exports = authenicate