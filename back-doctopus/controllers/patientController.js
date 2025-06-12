const Patient = require('../models/Patient');
const Medicament = require('../models/Medicament');
const Medecin = require('../models/Medecin');

// GET /patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('medicaments');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des patients' });
  }
};

// POST /patients
exports.createPatient = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      age,
      poids,
      taille,
      medicaments, // tableau d’IDs (correspond au modèle)
      medecinId
    } = req.body;

    const patient = new Patient({
      nom,
      prenom,
      age,
      poids,
      taille,
      medicaments
    });

    await patient.save();

    if (medecinId) {
      const medecin = await Medecin.findByIdAndUpdate(
        medecinId,
        { $push: { patients: patient._id } },
        { new: true }
      );
      if (!medecin) {
        return res.status(404).json({ error: 'Médecin non trouvé' });
      }
    }

    res.status(201).json({ message: 'Patient ajouté', patient });
  } catch (error) {
    console.error('Erreur création patient :', error);
    res.status(500).json({ error: 'Erreur lors de la création du patient' });
  }
};

// GET /patients/:id
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('medicaments');
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PUT /patients/:id
exports.updatePatient = async (req, res) => {
  try {
    const userRole = req.user.role;
    const updateData = {};

    if (userRole === 'RH') {
      const { nom, prenom, age, poids, taille } = req.body;
      Object.assign(updateData, { nom, prenom, age, poids, taille });
    } else if (userRole === 'MEDECIN') {
      const { medicaments } = req.body;
      if (!Array.isArray(medicaments)) {
        return res.status(400).json({ error: 'Le champ medicaments doit être un tableau' });
      }
      updateData.medicaments = medicaments;
    } else {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    const patient = await Patient.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

    res.json({ message: 'Patient mis à jour', patient });
  } catch (err) {
    console.error('Erreur updatePatient :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE /patients/:id
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json({ message: 'Patient supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
