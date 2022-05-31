const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const locationSchema = new Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    zip_code: {
        type: String,
        default: '',
    },

});

// passport local mongoose plugin

locationSchema.plugin(mongoosePaginate);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
