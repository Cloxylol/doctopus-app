// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Données simulées (en mémoire)
let patients = [];

// Routes
app.get('/patients', (req, res) => {
    res.json(patients);
});

app.post('/patients', (req, res) => {
    const patient = req.body;
    patients.push(patient);
    res.status(201).json({ message: 'Patient ajouté', patient });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur Doctopus en ligne sur http://localhost:${PORT}`);
});
