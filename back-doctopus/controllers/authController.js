const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'doctopusSecretKey'; 

exports.register = async (req, res) => {
    const { email, motDePasse, role, medecin } = req.body;

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({ email, motDePasse: hashedPassword, role, medecin });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé' });
};

exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email }).populate('medecin');

    if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
};
