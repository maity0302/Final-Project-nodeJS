const University = require('../models/University');
const { mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class AdminController {
    // [GET] /admin/list-university
    list(req, res, next) {
        University.find({}).lean()
        .then((uni) => {
            res.render('admin/list-university', {
                uni,
                user:mongooseToObject(req.user),
            });
        })
        .catch(next); 
    }
    // [GET] /admin/create
    create(req, res, next) {
        res.render('admin/create', {
            user:mongooseToObject(req.user),
        });
    }
    // [POST] /admin/store
    store(req, res, next) {
        if (req.files) {
            let arr = [];
            for (let index = 0; index < req.files.length; index++) {
                arr.push(req.files[index].filename)
            }
            req.body.image = arr;
        }
        const university = new University(req.body);
        university
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => { });
    }
    // [GET] /university/:id/edit
    edit(req, res, next) {
        University.findById(req.params.id).lean()
            .then((uni) =>
                res.render('admin/edit', {
                    uni,
                    user:mongooseToObject(req.user),
                }),
            )
            .catch(next);
    }
    // [DELETE] /admin/:id
    delete(req, res, next) {
        University.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [PUT] /admin/:id
    update(req, res, next) {
        if (req.files) {
            let arr = [];
            for (let index = 0; index < req.files.length; index++) {
                arr.push(req.files[index].filename)
            }
            req.body.image = arr;
        } else {
            req.body.image = req.body.image;
        }
        University.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/list-university'))
            .catch(next);
    }
}

module.exports = new AdminController();