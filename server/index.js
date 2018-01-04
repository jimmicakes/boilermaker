const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/_db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });
const passport = require('passport');
const { User } = require('./db/models');

dbStore.sync();

app.use(session({
    secret: process.env.SESSION_SECRET || 'a widely inseure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    try {
        done(null, user.id);
    } catch (err) {
        done(err)
    }
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done);
});

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname), '../public/index.html'));

app.use(express.static(path.join(__dirname, '../public')));

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;