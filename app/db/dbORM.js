const Sequelize = require('sequelize');

module.exports = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: '5432',
    database: 'db',
    username: 'user',
    password: 'pass'
});