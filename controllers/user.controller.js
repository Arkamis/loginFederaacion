const Users = require('../models/users');


const getUser = async (email, password) => {
    try {
        var user = await Users.findOne({email}).exec();
        if(!user){
            return null;
        }
        if(user.comparePassword({password})){
            return user;
        }else {
            return null;
        }
    }
    catch(err){
        console.log(err.message);
        return null;
    }
    
}

module.exports = {
    userLogin: async (req, res) => {
        let user = {
            email: req.body.email,
            password: req.body.password
        };
        req.session.user = {
            name_id: Math.random(10000),
            session_index: Math.random(10000)
        }
        var _user = await getUser(user.email, user.password);
        if(_user != null){

            req.session.user.data = {
                name: _user.name,
                email: _user.email,
                rol: _user.rol
            }
            res.status(200);
            return res.render('dashboard', {area: 'perfil', user: req.session.user.data});
        }
        return res.status(403).send('Error on login');
    },
    all: (req, res, next) => {
        res.render('login');
    },
    register: (req, res, next) => {
        try {
            const {email, password, rol, name } = req.body;
            const user = new Users({email, password, rol, name});
            user.save(function(err, doc){
                if(err){
                    return res.status(500).send('Error in register');
                }
                res.status(201).json({
                    message:"User created",
                    doc
                });
            });

        } catch (error) {
            res.status(400).send('Error en la peticion');
        }
    }
};