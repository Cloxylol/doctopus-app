const Patient = require('../models/Patient');
const Medicament = require('../models/Medicament');
const mongoose = require('mongoose');
const Medecin = require('../models/Medecin');
const { sendEmail } = require('../utils/emailService');


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
      medecinId,
      email
    } = req.body;

    const patient = new Patient({
      nom,
      prenom,
      age,
      poids,
      taille,
      medicaments,
      email
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
    } else if (userRole === 'MEDECIN' || userRole === 'ADMIN') {
      const { medicaments } = req.body;
      if (!Array.isArray(medicaments)) {
        return res.status(400).json({ error: 'Le champ medicaments doit être un tableau' });
      }
      updateData.medicaments = medicaments.map(id => new mongoose.Types.ObjectId(id));
    } else {
      return res.status(403).json({ error: 'Accès interdit' });
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('medicaments');
    
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    console.log(userRole, patient.email)
    // Envoi d'email
    if (userRole !== 'RH' && patient.email) {
      const medList = patient.medicaments.map(m => `• ${m.nom}`).join('<br>');
      console.log(medList);

      await sendEmail(
        patient.email,
        'Changement de traitement',
        `<p>Bonjour ${patient.prenom},</p><p>Votre médecin a mis à jour votre traitement. Voici les nouveaux médicaments prescrits :</p><p>${medList}</p><p>Cordialement,<br>L'équipe Doctopus</p>`
      );
    }

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
