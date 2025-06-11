const express = require('express');
const router = express.Router();
const controller = require('../controllers/rendezVousController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Création (MEDECIN)
router.post('/', verifyToken, requireRole('MEDECIN'), controller.creerRendezVous);

// Liste des RDV d’un médecin (MEDECIN)
router.get('/medecin/:id', verifyToken, requireRole('MEDECIN'), controller.getRendezVousByMedecin);

// Liste des RDV d’un patient 
router.get('/patient/:id', verifyToken, controller.getRendezVousByPatient);

// Annuler un RDV 
router.put('/:id/annuler', verifyToken, controller.annulerRendezVous);

module.exports = router;
