const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

mongoose.connect(keys.mongoURL)
    .catch( function(err) {
        console.log("==== AN ERROR HAS OCCURED WITH CONNECTING TO MONGO. ====");
        console.log(keys.mongoURL);
        console.log(err)
    })
    .then(function() {
        console.log("Successfully connected to MongoDB");
    });

require('./models/User');
require('./models/Team');
require('./models/Vote');
require('./services/passport');
const authRoutes = require('./routes/authRoutes')
const teamRoutes = require('./routes/teamRoutes')
const voteRoutes = require('./routes/voteRoutes')

const purge = require('./services/purge');


const app = express();
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['dfjghidsufghksdfhgakdfhgk']
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

authRoutes(app);
teamRoutes(app);
voteRoutes(app);

purge.beginPurge();

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
})

const PORT = process.env.PORT || 3000
app.listen(PORT); 