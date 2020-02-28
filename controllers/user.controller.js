const User = require('../models/user.model');


exports.user_get = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            res.send(user)
        }
        else {
            console.log(err)
        }
    })

};

exports.user_create = function (req, res) {
    console.log(req.body);
    let user = new User({
            login: req.body.login,
            password: req.body.password
        }
    );
    user.save(function (err) {
        if (!err) {
            console.log('create!');
            res.send('user was updated!');
        }
        else {
            console.log('dddd', err)
        }
    });
};

