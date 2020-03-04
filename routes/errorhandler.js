const createError= require('http-errors');

// catch 404 and forward to error handler
const getPage = (req, res, next) => {
    if(req.path == "/login"){
        return res.redirect("/users/login");
    } else{
        console.log('Pase por este middleware!! (GETPAGE)');
        let err = Error('pagina no encontrada');
        err.name = '404';
        next(createError(404));
    }
};

const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    // render the error page
    
    let errorStatus = (err.status)? err.status : 500;
    let errorOpt = createError(errorStatus, err);

    console.log('Hola pase por este middleware');
    res.status(404);
    res.send('Error 404, pagina no encontrada');

};

module.exports = {getPage, errorHandler};



