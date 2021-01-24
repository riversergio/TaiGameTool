const siteRouter = require('./site');
const dashboardRouter = require('./dashboard');
module.exports = function(app){
    app.use('/',siteRouter);
    app.use('/dashboard',dashboardRouter);
}