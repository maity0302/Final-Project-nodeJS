const University = require('../models/University');
const path = require('path');
const { mongooseToObject } = require('../../util/mongoose');


class UniversityController {
    // [GET] /university/:slug
    show(req, res, next) {
        University.findOne({slug: req.params.slug})
        .then((uni) =>
            res.render('university/show', {
                uni: mongooseToObject(uni),
            }),
        )
        .catch(next);
    }

    // [GET] /university/create
    create(req, res, next) {
        res.render('university/create');
    }

    // [POST] /university/store
    store(req, res, next) {
        // req.body.image = `${path.join(path.basename(path.dirname(path.dirname(__dirname))), 'public', 'images/') +'imagename'}`;
        const university = new University(req.body);
        university
            .save()
            .then(() => res.redirect('/home'))
            .catch(next);
    }
    
    // [DELETE] /university/:id
    delete(req, res, next) {
        University.deleteOne({_id: req.params.id})
        .then(() => {res.redirect('back')})
        .catch(next);
    }
}
module.exports = new UniversityController();