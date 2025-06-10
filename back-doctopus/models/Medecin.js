const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
    nom: String,
    specialite: String,
    email: String,
});

module.exports = mongoose.model('Medecin', medecinSchema);
