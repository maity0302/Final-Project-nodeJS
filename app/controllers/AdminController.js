const University = require('../models/University');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AdminController {
    // [GET] /me/list-university
    list(req, res, next) {
        University.find({})
        .then((uni) => {
            res.render('admin/list-university', {
                uni: mutipleMongooseToObject(uni),
            });
        })
        .catch(next); 
    }
}

module.exports = new AdminController();