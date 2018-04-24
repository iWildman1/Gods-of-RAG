const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user)
        })
})

passport.use(new FacebookStrategy({
    clientID: keys.appID,
    clientSecret: keys.appSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'picture.type(large)']
}, (accessToken, refreshToken, profile, done) => {
    const facebookId = profile._json.id;
    const name = profile._json.name;
    const email = profile._json.email;
    const pictureUrl = profile._json.picture.data.url;

    User.findOne({
        facebookId: facebookId
    })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser)
            } else {
                new User({
                    facebookId: facebookId,
                    name: name,
                    email: email,
                    pictureUrl: pictureUrl
                }).save()
                    .then((user) => {
                        done(null, user);
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        })
}));