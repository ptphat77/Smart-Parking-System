const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    balance: { type: Number, require: true, default: 0 },
    numberPlate: { type: String, require: true },
    token: { type: String, default: null },
    createdAtToken: { type: Date },
    isParking: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', User);
