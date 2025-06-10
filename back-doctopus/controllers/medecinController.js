const Medecin = require('../models/Medecin');

exports.getMedecins = async (req, res) => {
    const medecins = await Medecin.find();
    res.json(medecins);
};

exports.createMedecin = async (req, res) => {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).json({ message: 'Médecin ajouté', medecin });
};
