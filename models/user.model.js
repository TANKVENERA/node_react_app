const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    login: {type: String, required: true, max: 20},
    password: {type: String, required: true, max: 30},
    ads: [String]
});

module.exports = mongoose.model('User', UserSchema, 'user');