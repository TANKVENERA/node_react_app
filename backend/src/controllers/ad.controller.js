const Ad = require('../models/ad.model');
const User = require('../models/user.model');

exports.ad_create = function (request, response) {
    const userId = request.body.userId;
        Ad.create({
            mark: request.body.mark,
            model: request.body.model,
            price: request.body.price,
            milage: request.body.milage,
            manufactured: request.body.manufactured,
            color: request.body.color
        }).then((adId) => {
            console.log('ddd', adId)
        });
        // User.updateOne({_id: userId}, {"$push": {"ads": adId}}, function (err) {
        //     if (err) console.log(err);
        //     else return response.status('201').send({message: 'Successfully created', user: userId, ad: ad});
        // });
    // })
};