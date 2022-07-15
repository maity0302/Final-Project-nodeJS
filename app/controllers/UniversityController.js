const University = require('../models/University');
const Comment = require('../models/Comment');
const User =require('../models/User');
const { mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class UniversityController {
    // [GET] /university/:slug
    async show(req, res, next) {
        const query = await University.findOne({ slug: req.params.slug }).lean();
        const comments = await Comment.find({postId: query._id}).lean();
        const upvotes = query.upvoters.length;
        const downvotes = query.downvoters.length;
        var isUpVotes = false, isDownVotes = false;
        if(req.user) {
            var userId = req.user.toObject()._id;
            isUpVotes = query.upvoters.some(function (upvote) {
                return upvote.equals(userId);
            });
            isDownVotes = query.downvoters.some(function (upvote) {
                return upvote.equals(userId);
            });
        }
        University.findOne({ slug: req.params.slug }).lean()
            .then((uni) =>
                University.aggregate([{ $sample: { size: 3 } }, { $project: { slug: 1, name: 1, description: 1, image: 1 } }])
                    .then((unis) => {
                        res.render('university/show', {
                            uni,
                            unis,
                            user:mongooseToObject(req.user),
                            up: upvotes,
                            down: downvotes,
                            isUpVotes: isUpVotes,
                            isDownVotes: isDownVotes,
                            comments: comments,
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
    // [POST] /university/upvoted
    async upvote(req, res, next) {
        const universityId = req.body.universityId;
        const userId = req.user._id;
        const UpVote = await University.findOne({_id: universityId, upvoters: userId}).count().exec();
        const DownVote = await University.findOne({_id: universityId, downvoters: userId}).count().exec();
        if(UpVote > 0) {
            return await University.findOneAndUpdate({_id: universityId}, {
                $pullAll: {
                    upvoters: [userId],
                },
            });
        } 
        if (DownVote > 0) {
            await University.findOneAndUpdate({_id: universityId}, {
                $pullAll: {
                    downvoters: [userId],
                },
            });
            await University.findOneAndUpdate({_id: universityId},{$push: {upvoters: userId}});
        } else {
            await University.findOneAndUpdate({_id: universityId},{$push: {upvoters: userId}});
        }
    }
    // [POST] /university/downvoted
    async downvote(req, res, next) {
        const universityId = req.body.universityId;
        const userId = req.user._id;
        const UpVote = await University.findOne({_id: universityId, upvoters: userId}).count().exec();
        const DownVote = await University.findOne({_id: universityId, downvoters: userId}).count().exec();
        if(DownVote > 0) {
            return await University.findOneAndUpdate({_id: universityId}, {
                $pullAll: {
                    downvoters: [userId],
                },
            });
        } 
        if (UpVote > 0) {
            await University.findOneAndUpdate({_id: universityId}, {
                $pullAll: {
                    upvoters: [userId],
                },
            });
            await University.findOneAndUpdate({_id: universityId},{$push: {downvoters: userId}})
        } else {
            await University.findOneAndUpdate({_id: universityId},{$push: {downvoters: userId}});
        }
    }
}
module.exports = new UniversityController();