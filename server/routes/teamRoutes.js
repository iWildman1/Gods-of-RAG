const mongoose = require('mongoose');
const Team = mongoose.model('teams');

module.exports = (app) => {
    app.get('/api/team/upload/:name', (req, res) => {
        const name = req.params.name;
        let teams = 0;


        if (req.user) {
            if (req.user.email == "dan2384@hotmail.com") {
                Team.count()
                .then((count) => {
                    teams = count;
    
                    Team.findOne({
                        teamName: name
                    })
                        .catch((err) => {
                            console.log(err)
                        })
                        .then((existingTeam) => {
                            if (!existingTeam) {
                                new Team({
                                    teamId: count,
                                    teamName: name,
                                    votes: 0
                                }).save()
                                    .then(() => {
                                        res.redirect('/')
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            } else {
                                res.status(500).send('Error 500. Team already exists');
                            }
                        })
                })
            } else {
                res.status(403).send('<h1>403 Forbidden</h1><p>You do not have permission to access this endpoint</p>')
            }
        } else {
            res.status(403).send('<h1>403 Forbidden</h1><p>You must be logged in to access this endpoint</p>')
        }
    } )
}