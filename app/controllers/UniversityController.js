const University = require('../models/University');
const { mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class UniversityController {
    // [GET] /university/:slug
    show(req, res, next) {
        University.findOne({ slug: req.params.slug }).lean()
            .then((uni) =>
                University.aggregate([{ $sample: { size: 3 } }, { $project: { slug: 1, name: 1, description: 1, image: 1 } }])
                    .then((unis) => {
                        res.render('university/show', {
                            uni,
                            unis,
                            user:mongooseToObject(req.user),
                        })
                    })
            )
            .catch(next);
    }
    // [GET] /university/search
    search(req,res,next) {
        var searchText = req.query.q;
        searchText = searchText !== undefined ? searchText.trim().toLowerCase() : searchText;
        var regex = new RegExp(searchText, 'i');
        University.find({name: regex}).lean()
        .then(result => {
            res.render('university/search',{
                result,
                user:mongooseToObject(req.user),
            })
        })
        .catch(next);
    }
}
module.exports = new UniversityController();