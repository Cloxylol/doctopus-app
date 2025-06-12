const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicamentController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, controller.getMedicaments);
router.post('/', verifyToken, requireRole('MEDECIN'), controller.createMedicament);
router.put('/:id', verifyToken, requireRole('MEDECIN'), controller.updateMedicament);
router.delete('/:id', verifyToken, requireRole('MEDECIN'), controller.deleteMedicament);

module.exports = router;
