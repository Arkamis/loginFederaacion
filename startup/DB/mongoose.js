const mongoose = require('mongoose');

const uri = process.env.MONGOURI || 'mongodb+srv://developer:XXSHHM3uUjpsqpSx@cluster0-bmnrq.mongodb.net/notibuilder?retryWrites=true&w=majority';

mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser:true }, (err) => {
    if(err){
        console.log(err)
    }else {
        console.log('Mongo DB connected')
    }
})