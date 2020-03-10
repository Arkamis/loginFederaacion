module.exports = {
    checkUser: (req, res, next) => {
        const user = req.session.user;
        if(!user){
            return res.status('403').redirect('/login');
        }
        next();
    },
    alreadyIn: (req, res, next) => {
        console.log('Pase por este middleware');
        const user = req.session.user;
        if(!user){
            return next();
        }
        return res.status('200').render('dashboard', {area: "perfil", user: user.data})
    }
};