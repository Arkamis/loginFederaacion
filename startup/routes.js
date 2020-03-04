const noticiasRouter = require('../routes/noticias');
const usersRouter = require('../routes/users');
const dashboardRouter = require('../routes/dashboard');

//error
const {getPage, errorHandler} = require('../routes/errorhandler');

module.exports = function(app) {
    //connect to DB
    require('./DB/mongoose'); 
    //routes
    app.use('/users', usersRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/noticias', noticiasRouter);
    //error handler
    app.use(getPage);
    app.use('*', errorHandler)

}