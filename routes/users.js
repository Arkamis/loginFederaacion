var express = require('express');
const userController = require('../controllers/user.controller');
var router = express.Router();
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.route('/login')
    .get(middleware.alreadyIn, userController.all)
    .post(userController.userLogin);
router.route('/register')
    .post(userController.register);
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
