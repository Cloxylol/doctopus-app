const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');


router.get('/', verifyToken, patientController.getPatients);
router.post('/', verifyToken, requireRole('RH'), patientController.createPatient);
router.post('/:id/medicaments', verifyToken, requireRole('MEDECIN'), patientController.addMedicamentToPatient);
router.get('/:id', verifyToken, patientController.getPatientById);
router.put('/:id', verifyToken, requireRole('RH'), patientController.updatePatient);
router.delete('/:id', verifyToken, requireRole('RH'), patientController.deletePatient);


module.exports = router;
