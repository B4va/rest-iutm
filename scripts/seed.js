const Utilisateur = require('../app/models/utilisateur');

const seed = async () => {
    await Utilisateur.destroy({
        truncate: true,
    });
    await Utilisateur.bulkCreate([
        {
            nom: 'Hugo',
            prenom: 'Victor',
            email: 'vh@mail.com',
            bio: "J'ai écrit les Misérables."
        },
        {
            nom: 'Flaubert',
            prenom: 'Gustave',
            email: 'gf@mail.com',
            bio: "J'ai écrit Mme Bovary."
        },
        {
            nom: 'Rimbaud',
            prenom: 'Arthur',
            email: 'ar@mail.com',
            bio: "J'ai écrit les Illuminations."
        }
    ]);
}

seed().finally(() => process.exit(0));