const Users = require('../models/users');


const getUser = async (email, password) => {
    try {
        var user = await Users.findOne({email}).exec();
        return  user.comparePassword({password});
    }
    catch(err){
        console.log(err.message);
    }
    
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

module.exports = userLogin;