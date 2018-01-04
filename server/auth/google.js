const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const { User } = require('../db/models');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        function (token, refreshToken, profile, done) {
            const info = {
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos ? profile.photos[0].value : undefined
            };

            User.findOrCreate({
                where: {
                    googleId: profile.id
                },
                defaults: info
            })
                .spread((user) => {
                    done(null, user);
                })
                .catch(done);
        })
);

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;