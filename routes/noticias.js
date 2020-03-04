var express = require('express');
var router = express.Router();
const news = require('../models/news');
// const uploader = require('multer')({dest:'/uploads/'});

router.get('/:id?', async (req, res) => {
  const id = req.params.id;

  console.log(id);
  if(id){
    await news.findById(id).then( doc => {
      console.log(doc);
    });
    res.status(200).send('hola');
  }else{
    res.status(400).send('Please pass me an ID to search')
  } 
});

// router.post('/addNoticia', uploader.single('foto'), (req, res, next) => {
//   let foto = req.file;
//   console.log(foto);
//   try {
//     const {volanta, cuerpo, copete, titulo, epigrafe } = req.body;
//     var newNoticia = new news();
//     //thanks to ES6
//     newNoticia.save({
//       volanta, cuerpo, copete, titulo, epigrafe
//     })
//   } catch (error) {
//     next(new Error(error));
//   }
  
// });

module.exports = router;