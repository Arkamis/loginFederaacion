const express = require('express')
const router = express.Router();

router.get('/:area?',(req, res) => {
    let area = req.params.area || 'noticias';
    if(area === 'perfil' && req.session.user){
        res.render('dashboard', {area, user:req.session.user.data});
    }
    res.render('dashboard', {area});
});

router.post('/', (req, res) => {
    
})
module.exports = router;
