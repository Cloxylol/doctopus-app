const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');
const medecinRoutes = require('./routes/medecinRoutes');
const medicamentRoutes = require('./routes/medicamentRoutes');
const authRoutes = require('./routes/authRoutes');
const rdvRoutes = require('./routes/rdvRoutes');
const rhRoutes = require('./routes/RhRoutes');



const app = express();
const PORT = 3000;

// Connexion MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/doctopus');

mongoose.connection.on('connected', () => {
    console.log('✅ Connecté à MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('❌ Erreur MongoDB :', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/patients', patientRoutes);
app.use('/patients', patientRoutes);
app.use('/medecins', medecinRoutes);
app.use('/medicaments', medicamentRoutes);
app.use('/auth', authRoutes);
app.use('/rdv', rdvRoutes);
app.use('/rh', rhRoutes);



// Démarrage
app.listen(PORT, () => {
    console.log(`🟢 Serveur Doctopus en ligne sur http://localhost:${PORT}`);
});
