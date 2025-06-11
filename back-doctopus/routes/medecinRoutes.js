const express = require('express');
const router = express.Router();
const controller = require('../controllers/medecinController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');


router.get('/', verifyToken, controller.getMedecins);
router.post('/', verifyToken, requireRole('ADMIN'),  controller.createMedecin);
router.post('/:id/patients', verifyToken, requireRole('ADMIN'), controller.addPatientToMedecin);


module.exports = router;
