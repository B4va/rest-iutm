const express = require('express');
const Utilisateur = require('./models/utilisateur')

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * API.
 */

// TODO : gérer le xml et les langues

app.get('/api/utilisateur', async (req, res) => {
    const utilisateurs = await Utilisateur.findAll();
    if (utilisateurs) {
        res.status(200).send(utilisateurs);
    } else {
        res.status(204).send({msg: "Aucun utilisateur."});
    }
});

app.get('/api/utilisateur/:id', async (req, res) => {
    const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        res.status(200).send(utilisateur);
    } else {
        res.status(404).send({err: "Aucun utilisateur associé à l'id."});
    }
});

app.put('/api/utilisateur/:id', async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.body
        await Utilisateur.update(
            {
                nom: nom || null,
                prenom: prenom || null,
                email: email || null,
                bio: bio || null
            },
            {where: {id: req.params.id}}
        );
        const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
        if (utilisateur) {
            res.status(200).send(utilisateur);
        } else {
            res.status(404).send({err: "Aucun utilisateur associé à l'id."});
        }
    } catch (e) {
        res.status(400).send({err: "Mauvais format JSON."});
    }
});

app.patch('/api/utilisateur/:id', async (req, res) => {
    try {
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.updatedAt;
        await Utilisateur.update(req.body, {where: {id: req.params.id}});
        const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
        if (utilisateur) {
            res.status(200).send(utilisateur);
        } else {
            res.status(404).send({err: "Aucun utilisateur associé à l'id."});
        }
    } catch (e) {
        res.status(400).send({err: "Mauvais format JSON."});
    }
});

app.delete('/api/utilisateur/:id', async (req, res) => {
    const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        Utilisateur.destroy({where: {id: req.params.id}});
        res.status(200).send({msg: 'Objet supprimé.'});
    } else {
        res.status(400).send({err: "Aucun utilisateur associé à l'id."});
    }
});

app.post('/api/utilisateur', async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.body
        if (nom && prenom && email && bio) {
            const utilisateur = await Utilisateur.create({
                nom: nom,
                prenom: prenom,
                email: email,
                bio: bio
            });
            res.status(201).send(utilisateur);
        } else {
            res.status(400).send({err: "Tous les attributs doivent être renseignés"});
        }
    } catch (e) {
        res.status(400).send({err: "Mauvais format JSON."});
    }
});