const Sequelize = require('sequelize');

const databaseURL = process.env.DATABASE_URL ||
    'postgres://localhost:5432/Boilermaker';

const db = new Sequelize(databaseURL, {
    logging: false
});

module.exports = db;