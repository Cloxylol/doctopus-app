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

exports.updateMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicament) return res.status(404).json({ error: 'Médicament non trouvé' });
    res.json({ message: 'Médicament mis à jour', medicament });
  } catch (err) {
    console.error('Erreur mise à jour médicament :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.deleteMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.findByIdAndDelete(req.params.id);
    if (!medicament) return res.status(404).json({ error: 'Médicament non trouvé' });
    res.json({ message: 'Médicament supprimé' });
  } catch (err) {
    console.error('Erreur suppression médicament :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};