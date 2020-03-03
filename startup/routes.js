const indexRouter = require('../routes/index');
const noticiasRouter = require('../routes/noticias');
const aboutRouter = require('../routes/about');
const ayudarRouter = require('../routes/ayudar');
const talleresRouter = require('../routes/talleres');
const usersRouter = require('../routes/users');
const programasRouter = require('../routes/programas');
const devsRouter = require('../routes/devs');
const dashboardRouter = require('../routes/dashboard');

//error
const {getPage, errorHandler} = require('../routes/errorhandler');

module.exports = function(app) {
    app.use('/users', usersRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/noticias', noticiasRouter);
    //error handler
    app.use(getPage);
    app.use('*', errorHandler)

}