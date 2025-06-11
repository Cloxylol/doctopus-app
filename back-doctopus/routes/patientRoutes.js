const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');


router.get('/', verifyToken, patientController.getPatients);
router.post('/', verifyToken, requireRole('ADMIN'), patientController.createPatient);
router.post('/:id/medicaments', verifyToken, requireRole('MEDECIN'), patientController.addMedicamentToPatient);


module.exports = router;
