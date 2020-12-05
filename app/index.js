// 1';DELETE FROM "Notes" WHERE "student"='Charlotte' AND "note" < '10

const express = require('express');
const Utilisateur = require('./models/utilisateur')

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * API.
 */
app.get('/api/utilisateur', async (req, res) => {
    const utilisateurs = await Utilisateur.findAll();
    res.send(utilisateurs);
});
app.get('/api/utilisateur/:id', async (req, res) => {
    const utilisateur = await Utilisateur.findOne({id: req.params.id});
    res.send(utilisateur);
})