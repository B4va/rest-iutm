const express = require('express');
const Utilisateur = require('./models/utilisateur')
const convert = require('xml-js')
const bodyParser = require('body-parser')

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
const jsToXmlOptions = {compact: true, ignoreComment: true, spaces: 4}
const xmlToJsOptions = {ignoreComment: true, alwaysChildren: false, compact: true, textFn: (val) => val};
app.use(express.json());
app.use(bodyParser.raw({type: 'application/xml'}))

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * API.
 */

// TODO : refac

app.get('/api/utilisateur', async (req, res) => {
    let utilisateurs = await Utilisateur.findAll();
    if (utilisateurs) {
        if (req.header('Accept') === 'application/xml') {
            utilisateurs = convert.js2xml({
                utilisateurs: {
                    utilisateur: JSON.parse(JSON.stringify(utilisateurs))
                }
            }, jsToXmlOptions);
        }
        res.status(200).send(utilisateurs);
    } else {
        let msg = {msg: req.header('Accept-Language') === 'en' ? 'No user.' : 'Aucun utilisateur.'}
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(204).send(msg);
    }
});

app.get('/api/utilisateur/:id', async (req, res) => {
    let utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        if (req.header('Accept') === 'application/xml') {
            utilisateur = convert.js2xml({
                utilisateur: JSON.parse(JSON.stringify(utilisateur))
            }, jsToXmlOptions);
        }
        res.status(200).send(utilisateur);
    } else {
        let msg = {err: req.header('Accept-Language') === 'en'
                ? 'No user with this id.'
                : 'Aucun utilisateur associé à l\'id.'}
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(404).send(msg);
    }
});

app.put('/api/utilisateur/:id', async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.header('Accept') === 'application/xml'
            ? convert.xml2js(req.body, xmlToJsOptions).utilisateur
            : req.body;
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
            if (req.header('Accept') === 'application/xml') {
                utilisateur = convert.js2xml({
                    utilisateur: JSON.parse(JSON.stringify(utilisateur))
                }, jsToXmlOptions);
            }
            res.status(200).send(utilisateur);
        } else {
            let msg = {err: req.header('Accept-Language') === 'en'
                    ? 'No user with this id.'
                    : 'Aucun utilisateur associé à l\'id.'}
            if (req.header('Accept') === 'application/xml') {
                msg = convert.js2xml(msg, jsToXmlOptions)
            }
            res.status(404).send(msg);
        }
    } catch (e) {
        let msg = {err: req.header('Accept-Language') === 'en' ? 'Wrong format' : 'Mauvais format'
            + ' ' + req.header('Accept') === 'application/xml' ? 'XML' : 'JSON'} + '.';
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(404).send(msg);
    }
});

app.patch('/api/utilisateur/:id', async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.header('Accept') === 'application/xml'
            ? convert.xml2js(req.body, xmlToJsOptions).utilisateur
            : req.body;
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
            if (req.header('Accept') === 'application/xml') {
                utilisateur = convert.js2xml({
                    utilisateur: JSON.parse(JSON.stringify(utilisateur))
                }, jsToXmlOptions);
            }
            res.status(200).send(utilisateur);
        } else {
            let msg = {err: req.header('Accept-Language') === 'en'
                    ? 'No user with this id.'
                    : 'Aucun utilisateur associé à l\'id.'}
            if (req.header('Accept') === 'application/xml') {
                msg = convert.js2xml(msg, jsToXmlOptions)
            }
            res.status(404).send(msg);
        }
    } catch (e) {
        let msg = {err: req.header('Accept-Language') === 'en' ? 'Wrong format' : 'Mauvais format'
            + ' ' + req.header('Accept') === 'application/xml' ? 'XML' : 'JSON'} + '.';
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(404).send(msg);
    }
});

app.delete('/api/utilisateur/:id', async (req, res) => {
    const utilisateur = await Utilisateur.findOne({where: {id: req.params.id}});
    if (utilisateur) {
        await Utilisateur.destroy({where: {id: req.params.id}});
        let msg = {msg: req.header('Accept-Language') === 'en'
                ? 'Object deleted.'
                : 'Objet supprimé.'}
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(200).send(msg);
    } else {
        let msg = {err: req.header('Accept-Language') === 'en'
                ? 'No user with this id.'
                : 'Aucun utilisateur associé à l\'id.'}
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(404).send(msg);
    }
});

app.post('/api/utilisateur', async (req, res) => {
    try {
        const {nom, prenom, email, bio} = req.header('Accept') === 'application/xml'
            ? convert.xml2js(req.body, xmlToJsOptions).utilisateur
            : req.body;
        if (nom && prenom && email && bio) {
            let utilisateur = await Utilisateur.create(
                {
                    nom: nom._text || nom || null,
                    prenom: prenom._text || prenom || null,
                    email: email._text || email || null,
                    bio: bio._text || bio || null
                });
            if (req.header('Accept') === 'application/xml') {
                utilisateur = convert.js2xml({
                    utilisateur: JSON.parse(JSON.stringify(utilisateur))
                }, jsToXmlOptions);
            }
            res.status(201).send(utilisateur);
        } else {
            let msg = {err: req.header('Accept-Language') === 'en'
                    ? 'Attribute(s) missing.'
                    : 'Tous les attributs doivent être renseignés.'}
            if (req.header('Accept') === 'application/xml') {
                msg = convert.js2xml(msg, jsToXmlOptions)
            }
            res.status(404).send(msg);
        }
    } catch (e) {
        let msg = {err: req.header('Accept-Language') === 'en' ? 'Wrong format' : 'Mauvais format'
                + ' ' + req.header('Accept') === 'application/xml' ? 'XML' : 'JSON'} + '.';
        if (req.header('Accept') === 'application/xml') {
            msg = convert.js2xml(msg, jsToXmlOptions)
        }
        res.status(404).send(msg);
    }
});