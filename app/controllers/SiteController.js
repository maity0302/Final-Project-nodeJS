const University = require('../models/University');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        const limit = 6;
        var skip = (req.query.page - 1) * 6;
        University.find({}).skip(skip).limit(limit)
            .then((universitys) => {
                University.count()
                    .then(totalPages => {
                        res.render('home', {
                            maxPage: Math.ceil(totalPages / limit),
                            universitys: mutipleMongooseToObject(universitys),
                        });
                    })
            })
            .catch(next);
    }
}

module.exports = new SiteController();