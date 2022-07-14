const User = require("../models/User");
const { mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');
var moment = require('moment');
class MeController {
    // [GET] /me/profile
    profile(req, res, next) {
        var fomatted_date = moment(req.user.date).format('YYYY-MM-DD');
        res.render('me/profile', {
            user:mongooseToObject(req.user),
            date:fomatted_date,
        });
    };
    // [POST] /me/edit
    edit(req, res, next) {
        if(req.file) {
            req.user.image = req.file.filename
        } else {
            req.user.image = req.user.image
        }
        User.updateOne({_id: req.user._id}, req.user)
        .then(() => res.redirect('/me/profile'))
        .catch(next);
    }
}

module.exports = new MeController();