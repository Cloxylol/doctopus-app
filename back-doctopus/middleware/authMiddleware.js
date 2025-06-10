const jwt = require('jsonwebtoken');
const JWT_SECRET = 'doctopusSecretKey';

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requis' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token invalide' });
    }
};

exports.requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: 'Accès refusé' });
        next();
    };
};
