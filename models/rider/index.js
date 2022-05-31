const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const riderSchema = new Schema({
    name: {
        type: String
    },
    email_id: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String,

    },
    location_id: {
        type: Object,
        ref: 'Location'

    },
    reviews: {
        type: String
    },
    status: {
        type: String
    },
    image: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    DOB: {
        type: Date,

    },
});

// passport local mongoose plugin
riderSchema.plugin(passportLocalMongoose, { usernameField: 'email_id' });
riderSchema.plugin(mongoosePaginate);

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
