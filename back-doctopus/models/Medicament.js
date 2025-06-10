const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    nom: String,
    posologie: String,
    effetsSecondaires: String,
});

module.exports = mongoose.model('Medicament', medicamentSchema);
