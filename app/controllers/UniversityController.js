const University = require('../models/University');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');


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
        if(req.files) {
            let arr = [];
            for(let index = 0; index < req.files.length; index ++){
                arr.push(req.files[index].filename)
            }
            req.body.image = arr;
        }
        const university = new University(req.body);
        university
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
    
    // [DELETE] /university/:id
    delete(req, res, next) {
        University.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    // [GET] /university/:id/edit
    edit(req, res, next) {
        University.findById(req.params.id)
        .then((uni) => 
            res.render('university/edit', {
                uni: mongooseToObject(uni),
            }),
        )
        .catch(next);
    }
    // [PUT] /university/:id
    update(req, res, next) {
        if(req.files) {
            let arr = [];
            for(let index = 0; index < req.files.length; index ++){
                arr.push(req.files[index].filename)
            }
            req.body.image = arr;
        }
        University.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/admin/list-university'))
        .catch(next);
    }
}
module.exports = new UniversityController();