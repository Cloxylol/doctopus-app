const express = require('express');
const router = express.Router();
const controller = require('../controllers/medecinController');

router.get('/', controller.getMedecins);
router.post('/', controller.createMedecin);

module.exports = router;
