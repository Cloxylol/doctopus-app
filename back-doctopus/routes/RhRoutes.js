const express = require('express');
const router = express.Router();
const controller = require('../controllers/RhController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', controller.getRH);
router.post('/', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({
      email,
      motDePasse: hashedPassword,
      role: 'RH'
    });

    await user.save();
    res.status(201).json({ message: 'RH ajouté avec succès' });
  } catch (error) {
    console.error('Erreur ajout RH :', error);
    res.status(500).json({ error: 'Erreur lors de la création du RH' });
  }
});
router.delete('/:id', controller.deleteRH);
router.put('/:id', controller.updateRH);

module.exports = router;
