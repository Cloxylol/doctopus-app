const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    age: Number,
    poids: Number,
    taille: Number,
    medicaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament' }]
});

module.exports = mongoose.model('Patient', patientSchema);
