const db = {
    username: 'user',
    password: 'pass',
    database: 'db',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'postgres'
};

module.exports = {
    development: db,
    test: db,
    production: db,
};