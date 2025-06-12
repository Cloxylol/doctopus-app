const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');


router.get('/', verifyToken, patientController.getPatients);
router.post('/', verifyToken, requireRole('RH'), patientController.createPatient);
router.get('/:id', verifyToken, patientController.getPatientById);
router.put('/:id', verifyToken, patientController.updatePatient);
router.delete('/:id', verifyToken, requireRole('RH'), patientController.deletePatient);


module.exports = router;
