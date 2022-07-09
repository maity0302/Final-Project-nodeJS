const University = require('../models/University');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        var page = parseInt(req.query.page)
        const limit = 3
        var skip = (page-1) * limit || 0
        University.find({}).limit(limit).skip(skip).exec()
        .then((universitys) => {
            if(page*skip > universitys) {
                return res.render('error')
            }
            res.render('home', {
                universitys: mutipleMongooseToObject(universitys),
                maxPage: universitys.length,
            });
        })
        .catch(next); 
    }
}

module.exports = new SiteController();