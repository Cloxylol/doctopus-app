const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicamentController');

router.get('/', controller.getMedicaments);
router.post('/', controller.createMedicament);

module.exports = router;
