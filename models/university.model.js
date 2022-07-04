const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const University = new Schema(
    {
        name: { type: String, required: true, trim: true, lowercase: true},
        address: {type: String, required: true, trim: true},
        subBase: [{type: String}],
        phone: {type: String, trim: true },
        email: {type: String, trim: true,lowercase: true },
        website: {type: String},
        code: {type: String},
        facebook: {type: String},
        level: {type: String},
        description: { type: String, trim: true },
        admission: [{type: String}],
        tuision:[{type: Number, trim: true}],
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// add plugin
mongoose.plugin(slug);

module.exports = mongoose.model('University', University);