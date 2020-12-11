const express = require('express');
const Utilisateur = require('./models/utilisateur');
const bodyParser = require('body-parser');
const xmlBodyParser = require('./xmlBodyParser');
const {sendMsg, sendData, sendDataArray} = require('./webUtils');

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.raw({type: 'application/xml'}))

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * API.
 */

// READ (all)
app.get('/api/utilisateur', async (req, res) => {
    let utilisateurs = await Utilisateur.findAll();
    if (utilisateurs) {
        sendDataArray(req, res, utilisateurs)
    } else {
        sendMsg(req, res, 204, 'Aucun utilisateur.', 'No user.');
    }
});

// READ (one)
app.get('/api/utilisateur/:id', async (req, res) => {
    let utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        sendData(req, res, utilisateur, 200);
    } else {
        sendMsg(req, res, 404, 'Aucun utilisateur associé à l\'id.', 'No user with this id.');
    }
});

// UPDATE (whole)
app.put('/api/utilisateur/:id', xmlBodyParser, async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.body;
        await Utilisateur.update(
            {
                nom: nom._text || nom || null,
                prenom: prenom._text || prenom || null,
                email: email._text || email || null,
                bio: bio._text || bio || null
            },
            {where: {id: req.params.id}}
        );
        let utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
        if (utilisateur) {
            sendData(req, res, utilisateur, 200);
        } else {
            sendMsg(req, res, 404, 'Aucun utilisateur associé à l\'id.', 'No user with this id.');
        }
    } catch (e) {
        sendMsg(req, res, 400, 'Mauvais format de la requête.', 'Wrong request format.');
    }
});

// UPDATE (attribute)
app.patch('/api/utilisateur/:id', xmlBodyParser, async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.body;
        await Utilisateur.update(
            {
                nom: nom ? nom._text || nom : undefined,
                prenom: prenom ? prenom._text || prenom : undefined,
                email: email ? email._text || email : undefined,
                bio: bio ? bio._text || bio : undefined
            },
            {where: {id: req.params.id}}
        );
        let utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
        if (utilisateur) {
            sendData(req, res, utilisateur, 200);
        } else {
            sendMsg(req, res, 404, 'Aucun utilisateur associé à l\'id.', 'No user with this id.');
        }
    } catch (e) {
        sendMsg(req, res, 400, 'Mauvais format de la requête.', 'Wrong request format.');
    }
});

// DELETE
app.delete('/api/utilisateur/:id', async (req, res) => {
    const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        await Utilisateur.destroy({where: {id: req.params.id}});
        sendMsg(req, res, 200, 'Objet supprimé.', 'Object deleted.');
    } else {
        sendMsg(req, res, 404, 'Aucun utilisateur associé à l\'id.', 'No user with this id.');
    }
});

// CREATE
app.post('/api/utilisateur', xmlBodyParser, async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.body;
        if (nom && prenom && email && bio) {
            let utilisateur = await Utilisateur.create(
                {
                    nom: nom._text || nom || null,
                    prenom: prenom._text || prenom || null,
                    email: email._text || email || null,
                    bio: bio._text || bio || null
                });
            sendData(req, res, utilisateur, 201);
        } else {
            sendMsg(req, res, 400, 'Tous les attributs doivent être renseignés.', 'Attribute(s) missing.');
        }
    } catch (e) {
        sendMsg(req, res, 400, 'Mauvais format de la requête.', 'Wrong request format.');
    }
});