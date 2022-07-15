const Comment = require('../models/Comment');

class CommentController {
    // [PUT] /comment/:id/report
    report(req, res, next) {
        Comment.findOneAndUpdate({_id: req.params.id},{ $set: { isReported : true } } )
        .then(() => res.redirect('back'))
        .catch(next);
    }
    // [POST] /comment
    add(req, res, next) {
        req.body.userId = req.user._id;
        const comment = new Comment(req.body);
        comment.save()
        .then(() => res.redirect('back'))
        .catch(err=>console.log(err));
    }
}

module.exports = new CommentController();