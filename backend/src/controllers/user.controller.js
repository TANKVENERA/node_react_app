const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.user_login = function(request, response) {


    User.findOne({login: request.body.login}).then(user => {
        console.log('GET USER: ', request.headers.cookie);
        console.log('GENERATED_ID: ', request.cookies);

        if (user) {
            bcrypt.compare(request.body.password, user.password, function (err, isPasswordValid) {
                request.session.user = user;
                isPasswordValid ? response.status(201).json({user : user.login, session : request.sessionID}) : '';

        })

        }else {
            console.log('not found')
        }
    })
};


exports.start = function(req, res) {
    res.json({session : req.session})
};

exports.user_get = function (req, res) {
    req.session.userID = req.params.id;
    console.log('My session', req.sessionID);
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            res.send(req.session);
            console.log(req.session)
        } else {
            console.log('ERROR')
        }
    })
};

exports.user_create = function (req, res) {
    console.log(req.body);
    let user = new User({
        login: req.body.login,
        password: req.body.password
    });
    user.save(function (err) {
        if (!err) {
            console.log('create!');
            res.send('user was updated!');
        } else {
            console.log('dddd', err)
        }
    });
};

