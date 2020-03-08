var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   console.log('hi')
//   res.render('login');
// });

// router.post('/login', (req,res, next) => {
//   const User = {
//     name: 'test@123',
//     password: '123'
//   };

//   let user = req.body.email;
//   let password = req.body.password;
//   if(User.name == user && User.password == password){
//     //res.render('dashboard', {user});
//     console.log('User:' + user + '\nPassword:' + password)
//     res.status(201);
//     res.render('dashboard', {area: 'noticias'});
//   } else {
//     let error = Error();
//     error.message = 'error en credenciales';
//     error.name = "ACCESS ERROR";

//     console.log('Mi error creado: ', error.name);
//     res.status(301)
//     next(error);
//   }
// });

// router.get('/logout', (req, res, next) => {
//   //query a mongo para sacar token
//   var errop = Error('Algo salio mal :(');
//   errop.name('ERROR HANDLING SOMETHING');
//   if(errop){
//     next(errop);
//   }
//   res.status(200);
//   res.redirect('/login');
// });


module.exports = router;
