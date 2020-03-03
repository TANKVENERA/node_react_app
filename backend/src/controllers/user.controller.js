const User = require('../models/user.model');

exports.user_login = function(req, res) {
    User.findOne({login: req.body.login}).then((user) => {
        req.session.user = user;
        console.log('GET USER: ', req.session.user);
        res.send('saved', req.session.user)
    })


};


exports.start = function(req, res) {
    console.log('GET!!!!!!: ', req.sessionID);
    console.log('USER: ', req.session.userID);
    res.send(req.session.userID)
};

exports.user_get = function (req, res) {
    req.session.userID = req.params.id;
    console.log('My session', req.sessionID);
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            res.send(req.session)
        } else {
            console.log(err)
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

