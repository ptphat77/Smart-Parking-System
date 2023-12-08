const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Session = new Schema({
    slotNumber: { type: Number, require: true },
    username: { type: String, require: true },
    startTime: { type: Date, require: true},
});

module.exports = mongoose.model('Session', Session);
