const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RatingSchema = new Schema({
    rating: {
        type: Number,
        default: '',
    },
    comment: {
        type: String,
        default: '',
    },
    driver_id: {
        type: Object,

    },

});

// passport local mongoose plugin

RatingSchema.plugin(mongoosePaginate);

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
