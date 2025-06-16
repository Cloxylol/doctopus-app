const RendezVous = require('../models/RendezVous');
const Patient = require('../models/Patient');
const { sendEmail } = require('../utils/emailService');


exports.creerRendezVous = async (req, res) => {
    try {
        const { patient, dateDebut, dateFin } = req.body;
        const medecin = req.user.userId;

        const rdv = new RendezVous({ patient, medecin, dateDebut, dateFin });
        await rdv.save();

        // Envoi de mail au patient
        const patientData = await Patient.findById(patient);
        if (patientData?.email) {
            const formattedDate = new Date(dateDebut).toLocaleString('fr-FR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            await sendEmail(
                patientData.email,
                '📅 Confirmation de rendez-vous',
                `<p>Bonjour ${patientData.prenom},</p>
                <p>Un rendez-vous a été planifié pour vous le <strong>${formattedDate}</strong>.</p>
                <p>Merci d’arriver quelques minutes à l’avance.</p>
                <p>À bientôt,<br>L'équipe Doctopus 🐙</p>`
            );
        }

        res.status(201).json({ message: 'RDV créé', rdv });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du RDV' });
    }
};


exports.getRendezVousByMedecin = async (req, res) => {
    try {
        const rdvs = await RendezVous.find({ medecin: req.params.id }).populate('patient');
        res.json(rdvs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du chargement des RDV' });
    }
};

exports.getRendezVousByPatient = async (req, res) => {
    try {
        const rdvs = await RendezVous.find({ patient: req.params.id }).populate('medecin');
        res.json(rdvs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du chargement des RDV' });
    }
};

exports.annulerRendezVous = async (req, res) => {
    try {
        const rdv = await RendezVous.findById(req.params.id);
        if (!rdv) return res.status(404).json({ error: 'RDV non trouvé' });

        rdv.statut = 'annulé';
        await rdv.save();

        res.json({ message: 'RDV annulé', rdv });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l’annulation' });
    }
};
