const Medicament = require('../models/Medicament');

exports.getMedicaments = async (req, res) => {
    const medicaments = await Medicament.find();
    res.json(medicaments);
};

exports.createMedicament = async (req, res) => {
    const medicament = new Medicament(req.body);
    await medicament.save();
    res.status(201).json({ message: 'Médicament ajouté', medicament });
};
