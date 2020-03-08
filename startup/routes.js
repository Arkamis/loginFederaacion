const noticiasRouter = require('../routes/noticias');
const usersRouter = require('../routes/users');
const dashboardRouter = require('../routes/dashboard');
const authRouter = require('../routes/auth');
//error
const {getPage, errorHandler} = require('../routes/errorhandler');

module.exports = function(app) {
    //connect to DB
    //routes
    app.use('/users', usersRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/noticias', noticiasRouter);
    app.use('/', authRouter);
    require('./DB/mongoose'); 

}