const Patient = require('../models/Patient');
const Medicament = require('../models/Medicament');

// GET /patients
exports.getPatients = async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
};

// POST /patients
exports.createPatient = async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: 'Patient ajouté', patient });
};

exports.addMedicamentToPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

        const medicament = new Medicament(req.body);
        await medicament.save();

        patient.medicaments.push(medicament._id);
        await patient.save();

        res.status(201).json({ message: 'Médicament ajouté au patient', medicament });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getPatientById = async (req, res) => {
    const patient = await Patient.findById(req.params.id).populate('medicaments');
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json(patient);
};

exports.updatePatient = async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json({ message: 'Patient mis à jour', patient });
};

exports.deletePatient = async (req, res) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json({ message: 'Patient supprimé' });
};

