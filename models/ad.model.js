const mongoose = require('mongoose');

let AdSchema = new mongoose.Schema({
    mark: {type: String, required: true, max: 20},
    model: {type: String, required: true, max: 30},
    price: {type: Number, required: true, min: 1, max: 999999},
    milage: {type: Number, required: true, min: 0, max: 1000000},
    manufactured: {type: Number, required: true, min: 1970},
    color: {type: String, required: true, max: 20},

});

module.exports = mongoose.model('Ad', AdSchema, 'ad');