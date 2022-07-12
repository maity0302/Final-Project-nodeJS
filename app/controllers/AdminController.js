const University = require('../models/University');

class AdminController {
    // [GET] /me/list-university
    list(req, res, next) {
        University.find({}).lean()
        .then((uni) => {
            console.log(uni)
            res.render('admin/list-university', {
                uni,
            });
        })
        .catch(next); 
    }
}

module.exports = new AdminController();