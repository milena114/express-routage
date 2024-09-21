const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour vérifier l'heure d'ouverture
app.use((req, res, next) => {
    const currentTime = new Date();
    const day = currentTime.getDay(); // 0: Dimanche, 1: Lundi, ..., 6: Samedi
    const hour = currentTime.getHours(); // Heure en 24h

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Heures d'ouverture
    } else {
        res.status(503).send('L\'application est fermée. Veuillez revenir pendant les heures d\'ouverture.');
    }
});

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index1.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index2.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur http://localhost:${PORT}`);
});
