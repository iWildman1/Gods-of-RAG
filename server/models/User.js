const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    facebookId: String,
    name: String,
    email: String,
    pictureUrl: String
})

mongoose.model('users', userSchema);