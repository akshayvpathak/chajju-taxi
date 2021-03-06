const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const vehicleSchema = new Schema({
    model: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    cost_per_KM: {
        type: Number,
    },
    status: {
        type: String,
        default: '',
    },
    driver_id: {
        type: Object,

    },
    licence_plate_number: {
        type: String,

    },

});

// passport local mongoose plugin
vehicleSchema.plugin(mongoosePaginate);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
