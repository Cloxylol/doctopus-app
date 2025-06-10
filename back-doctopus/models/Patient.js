const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    age: Number,
    poids: Number,
    taille: Number,
    traitement: String,
});

module.exports = mongoose.model('Patient', patientSchema);
