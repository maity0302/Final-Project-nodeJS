const University = require('../models/University');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        University.find({})
        .then((universitys) => {
            res.render('home', {
                universitys: mutipleMongooseToObject(universitys),
            });
        })
        .catch(next); 
    }
}

module.exports = new SiteController();