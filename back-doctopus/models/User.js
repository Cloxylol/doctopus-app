const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    motDePasse: String,
    role: { type: String, enum: ['ADMIN', 'RH', 'MEDECIN'], required: true },
    medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin' }
});

module.exports = mongoose.model('User', userSchema);
