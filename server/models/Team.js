const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamId: Number,
    teamName: String,
    votes: Number
});

mongoose.model('teams', teamSchema);