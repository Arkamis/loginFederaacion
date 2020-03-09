var express = require('express');
const userController = require('../controllers/user.controller');
var router = express.Router();

/* GET users listing. */
router.route('/login')
    .get(userController.all)
    .post(userController.userLogin);

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
