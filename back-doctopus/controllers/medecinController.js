const Medecin = require('../models/Medecin');
const Patient = require('../models/Patient');
const User = require('../models/User');
const bcrypt = require('bcryptjs');



exports.getMedecins = async (req, res) => {
  const medecins = await Medecin.find();
  res.json(medecins);
};

exports.createMedecin = async (req, res) => {
  try {
    const { nom, specialite, email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Création du User
    const user = new User({
      email,
      motDePasse: hashedPassword,
      role: 'MEDECIN'
    });

    await user.save();

    // Création du Médecin lié au User
    const medecin = new Medecin({
      nom,
      specialite,
      email,
      user: user._id
    });

    await medecin.save();

    res.status(201).json({ message: 'Médecin et utilisateur créés', medecin });
  } catch (error) {
    console.error('Erreur création médecin :', error);
    res.status(500).json({ error: 'Erreur lors de la création du médecin' });
  }
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

exports.getPatientsByUserId = async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') {
      const patients = await Patient.find().populate('medicaments');
      return res.json({ patients });
    }


    const medecin = await Medecin.findOne({ user: req.user.userId })
      .populate({
        path: 'patients',
        populate: { path: 'medicaments' }
      });

    if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });

    res.json({ patients: medecin.patients });
  } catch (err) {
    console.error('Erreur récupération patients :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

