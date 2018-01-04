const Sequelize = require('sequelize');

const db = require('../_db');

const Puppy = db.define('puppy', {
    name: Sequelize.STRING
});

module.exports = Puppy;