const Sequelize = require('sequelize');

const db = require('../_db');

const Kitten = db.define('kitten', {
    name: Sequelize.STRING
});

module.exports = Kitten;