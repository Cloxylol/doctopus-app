const express = require('express');
const router = express.Router();
const controller = require('../controllers/rdvController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Création (MEDECIN)
router.post('/', verifyToken, requireRole('MEDECIN'), controller.creerRendezVous);

router.get('/medecin/:id', verifyToken, requireRole('MEDECIN'), controller.getRendezVousByMedecin);

router.get('/patient/:id', verifyToken, controller.getRendezVousByPatient);

router.put('/:id/annuler', verifyToken, controller.annulerRendezVous);

module.exports = router;
