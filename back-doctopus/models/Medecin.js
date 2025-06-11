const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
    nom: String,
    specialite: String,
    email: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

module.exports = mongoose.model('Medecin', medecinSchema);
