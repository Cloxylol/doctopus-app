const RendezVous = require('../models/RendezVous');

exports.creerRendezVous = async (req, res) => {
    try {
        const { patient, medecin, dateDebut, dateFin } = req.body;
        const rdv = new RendezVous({ patient, medecin, dateDebut, dateFin });
        await rdv.save();
        res.status(201).json({ message: 'RDV créé', rdv });
    } catch (err) {
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
