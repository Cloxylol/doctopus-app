const express = require('express');
const router = express.Router();
const controller = require('../controllers/medecinController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');


router.get('/', verifyToken, controller.getMedecins);
router.post('/', verifyToken, requireRole('ADMIN'),  controller.createMedecin);
router.post('/:id/patients', verifyToken, requireRole('ADMIN'), controller.addPatientToMedecin);
router.get('/:id', verifyToken, controller.getMedecinById);
router.put('/:id', verifyToken, requireRole('ADMIN'), controller.updateMedecin);
router.delete('/:id', verifyToken, requireRole('ADMIN'), controller.deleteMedecin);



module.exports = router;
