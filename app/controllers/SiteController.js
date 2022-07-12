const University = require('../models/University');
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
                        });
                    })
            })
            .catch(next);
    }
}

module.exports = new SiteController();