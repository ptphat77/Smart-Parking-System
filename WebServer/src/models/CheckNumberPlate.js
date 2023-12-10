const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CheckNumberPlate = new Schema({
    numberPlate: { type: String, require: true }
});

module.exports = mongoose.model('CheckNumberPlate', CheckNumberPlate);
