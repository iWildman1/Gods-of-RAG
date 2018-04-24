const mongoose = require('mongoose');
const Vote = mongoose.model('votes');
const Team = mongoose.model('teams');

module.exports = (app) => {
    app.post('/api/vote/:id', (req, res) => {
        const user = req.user;

        if (user) {
            const teamId = req.params.id;
            const voterEmail = user.email;
            const createdAt = new Date();

            let targetTeam = null;

            Vote.findOne({
                voterEmail: voterEmail
            })
            .then((data) => {
                if (!data) {
                    Team.findOne({
                        teamId: teamId
                    })
                    
                    .then((team) => {
        
                        targetTeam = team;
                        Vote.count()
                        .then((count) => {
                            new Vote({
                                voteId: count,
                                teamId: teamId,
                                voterEmail: voterEmail,
                                createdAt: createdAt
                            }).save()
                            
                            .then(() => {
                                let teamVotes = targetTeam.votes;
                                teamVotes++;
                                
                                targetTeam.votes = teamVotes;
                                targetTeam.save()
                                .then(() => {
                                    res.redirect('/');
                                })
                                .catch((err) => {
                                    res.status(500).send("<h1>500 Internal Server Error</h1><p>There was an error whilst counting the vote.</p>");
                                })
                            })
                            .catch((err) => {
                                res.status(500).send("<h1>500 Internal Server Error</h1><p>There was an error whilst saving the vote.</p>");
                            })
                        })
                    })
                    .catch((err) => {
                        res.status(500).send("<h1>500 Internal Server Error</h1><p>No team exists with specified ID</p>");
                    })

                } else {
                    res.status(403);
                    res.json({
                        message: "Vote limit reached for current user",
                        errCode: 0
                    })
                }
            })
        } else {
            res.status(403).send('<h1>403 Forbidden</h1><p>You must be logged in to submit a vote</p>');
        }
    })
}