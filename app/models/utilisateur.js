const DataTypes = require('sequelize');
const db = require('../db/dbORM');

module.exports = db.define(
    'Utilisateur', {
        nom: {type: DataTypes.STRING},
        prenom: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        bio: {type: DataTypes.STRING}
    },
    {
        timestamps: true
    }
);