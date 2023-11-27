const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Slot = new Schema({
    slotNumber: { type: Number, require: true },
    isBlank: { type: Boolean, require: true },
})

module.exports = mongoose.model('Slot', Slot);