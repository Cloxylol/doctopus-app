const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin', required: true },
    dateDebut: Date,
    dateFin: Date,
    statut: { type: String, enum: ['confirmé', 'annulé', 'en attente'], default: 'en attente' },
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
