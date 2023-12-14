const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    balance: { type: Number, require: true, default: 0 },
    token: { type: String, default: null },
    startTime: { type: String, default: null },
    userStatus: { type: Number, default: 0 }, // 0 = outside parking, 1 = booking, 2 = inside parking
});

module.exports = mongoose.model('User', User);
