const siteRouter = require('./site');
module.exports = function(app){
    app.use('/',siteRouter);
}