var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name: String,
    seats: Number,
    courseId: Number
}, {collection: 'section'});

// {type: mongoose.Schema.Types.ObjectId}

module.exports = sectionSchema;