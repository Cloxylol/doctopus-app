const User = require('../models/User');

exports.getRH = async (req, res) => {
  try {
    const rhUsers = await User.find({ role: 'RH' });
    res.json(rhUsers);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createRH = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = new User({ email, motDePasse, role: 'RH' });
    await user.save();
    res.status(201).json({ message: 'RH créé', user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur création RH' });
  }
};

exports.deleteRH = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'RH supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression RH' });
  }
};

exports.updateRH = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'RH mis à jour', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erreur modification RH' });
  }
};
