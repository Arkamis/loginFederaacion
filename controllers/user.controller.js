const Users = require('../models/users');


const getUser = async (email, password) => {
   return  await Users.findOne({email, password});
}

const userLogin = (req, res) => {
    let user = {
        email: req.body.password,
        password: req.body.password
    };
    if(getUser(user.email, user.password)){
        res.status(200);
        res.render('dashboard', {area: 'perfil', user});
    }
}