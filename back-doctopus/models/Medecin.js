const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
    nom: String,
    specialite: String,
    email: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Medecin', medecinSchema);
