const University = require('../models/University');
const { mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        const limit = 6;
        var skip = (req.query.page - 1) * 6;
        University.find({}).skip(skip).limit(limit).lean()
            .then((universitys) => {
                University.count()
                    .then(totalPages => {
                        res.render('home', {
                            maxPage: Math.ceil(totalPages / limit),
                            universitys,
                            user:mongooseToObject(req.user),
                        });
                    })
            })
            .catch(next);
    }
    // [GET] /contact
    contact(req, res, next) {
        res.render('contact', {
            user:mongooseToObject(req.user),
        })
    }
}

module.exports = new SiteController();