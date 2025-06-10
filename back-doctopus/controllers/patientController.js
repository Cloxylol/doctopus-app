const Patient = require('../models/Patient');

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
