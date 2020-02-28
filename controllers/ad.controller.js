const Ad = require('../models/ad.model');

exports.ad_create = function (req, res) {
    console.log(req.body);
    let ad = new Ad({
            mark: req.body.mark,
            model: req.body.model,
            price: req.body.price,
            milage: req.body.milage,
            manufactured: req.body.manufactured,
            color: req.body.color
        }
    );
    ad.save(function (err) {
        if (!err) {
            console.log('saves', ad.id);
            res.send('ad was created!');
        }
        else {
            console.log('saves', err)
        }
    });
};