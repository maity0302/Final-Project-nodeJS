const university = require('../models/University');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        university.find({})
        .then((universitys) => {
            res.render('home', {
                universitys: mutipleMongooseToObject(universitys),
            });
        })
        .catch(next); 
    }
}

module.exports = new SiteController();