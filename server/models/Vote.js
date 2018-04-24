const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    voteId: Number,
    teamId: Number,
    voterEmail: String,
    createdAt: Date
});

mongoose.model('votes', voteSchema);