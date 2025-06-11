const Medecin = require('../models/Medecin');
const Patient = require('../models/Patient');


exports.getMedecins = async (req, res) => {
    const medecins = await Medecin.find();
    res.json(medecins);
};

exports.createMedecin = async (req, res) => {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).json({ message: 'Médecin ajouté', medecin });
};

exports.addPatientToMedecin = async (req, res) => {
    try {
        const medecin = await Medecin.findById(req.params.id);
        if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });

        const patient = new Patient(req.body);
        await patient.save();

        medecin.patients.push(patient._id);
        await medecin.save();

        res.status(201).json({ message: 'Patient ajouté au médecin', patient });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getMedecinById = async (req, res) => {
    const medecin = await Medecin.findById(req.params.id).populate('patients');
    if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });
    res.json(medecin);
};

exports.updateMedecin = async (req, res) => {
    const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });
    res.json({ message: 'Médecin mis à jour', medecin });
};

exports.deleteMedecin = async (req, res) => {
    const medecin = await Medecin.findByIdAndDelete(req.params.id);
    if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });
    res.json({ message: 'Médecin supprimé' });
};
