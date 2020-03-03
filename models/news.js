const {Schema, model} = require('mongoose');

const newSchema = new Schema({
    volanta: String,
    titulo: String,
    copete: String,
    cuerpo: String,
    fotografia: String,
    epigrafe: String,
    fecha: Date
});

module.exports = model('news', newSchema);