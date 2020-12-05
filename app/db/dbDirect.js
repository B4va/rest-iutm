const {Client} = require('pg');

const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    user: 'user',
    password: 'pass',
    database: 'db',
    port: 5432
});

client.connect();

module.exports = client;