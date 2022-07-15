const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        postId: {type: Schema.Types.ObjectId, ref: 'University'},
        content: {type: String, trim: true, require: true},
        isReported: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Comment', Comment);
