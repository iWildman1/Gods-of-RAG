const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('./config/keys');

const app = express();

passport.use(new FacebookStrategy({
    clientID: keys.appID,
    clientSecret: keys.appSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'picture.type(large)']
}, (accessToken, refreshToken, profile, done) => {
     console.log(profile._json);
}));

app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'))

const PORT = process.env.PORT || 3000
app.listen(PORT);