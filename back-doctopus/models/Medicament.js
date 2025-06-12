const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    nom: String,
    posologie: String,
    descriptions: String,
    photoBase64: String 
});

module.exports = mongoose.model('Medicament', medicamentSchema);
