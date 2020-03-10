const express = require('express')
const router = express.Router();
const middleware = require('../middleware/middleware');

router.get('/:area?', middleware.checkUser, (req, res) => {
    let area = req.params.area || 'noticias';
    if(area == 'perfil'){
        console.log('Entre !');
        const user = (req.session.user)? req.session.user.data : null;
        return res.render('dashboard', {user, area});
    }
    res.render('dashboard', {area});
});

router.post('/', (req, res) => {
    
})
module.exports = router;
