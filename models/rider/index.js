const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const riderSchema = new Schema({
    start_location_id: {
        type: Object,
        default: '',
    },
    end_location_id: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
    driver_id: {
        type: Object,

    },
    taxi_id: {
        type: Object,

    },
    start_time: {
        type: Date,
        default: Date.now
    },
    end_time: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: '',
    },
    payment_id: {
        type: Object,

    },
    driver_rating: {
        type: Number,

    },
    rider_id: {
        type: Object,

    },
});

// passport local mongoose plugin
riderSchema.plugin(mongoosePaginate);

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
