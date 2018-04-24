const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
        res.redirect('/user/current');
    });

    app.get('/user/current', (req, res) => {
        res.render('index', {
            user: req.user
        })
    } );

    app.get('/user/logout', (req, res) => {
        req.logout();
        res.redirect('/user/current');
    });
}

