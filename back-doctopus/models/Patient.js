const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    age: Number,
    poids: Number,
    taille: Number,
    email: { type: String, required: true },
    medicaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicament' }]
});

module.exports = mongoose.model('Patient', patientSchema);
