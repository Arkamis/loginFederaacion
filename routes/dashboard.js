const express = require('express')
const router = express.Router();

router.get('/:area?',(req, res) => {
    let area = req.params.area || 'noticias'
    console.log(area)
    res.render('dashboard', {area});
});

router.post('/', (req, res) => {
    
})
module.exports = router;
