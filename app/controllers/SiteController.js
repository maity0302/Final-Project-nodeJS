const university = require('../models/University');

class SiteController {
    // [GET] /
    index(req, res, next) {
        university.find({})
        .then((unis) => {
            res.render('home', {
                unis
            });
        })
        .catch(next); 
    }
}

module.exports = new SiteController();