const mongoose = require('mongoose');
const Vote = mongoose.model('votes');

const beginPurge = () => {
    setTimeout(() => {
        Vote.find({
            createdAt: { $lt: ((new Date()) - 900000 ) }
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                data[i].remove();
            }
        })
        beginPurge();
    }, 60000);
}

module.exports = {
    beginPurge: beginPurge
}