const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');

passport.use(new FacebookStrategy({
    clientID: keys.appID,
    clientSecret: keys.appSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'picture.type(large)']
}, (accessToken, refreshToken, profile, done) => {
     console.log(profile._json);
}));