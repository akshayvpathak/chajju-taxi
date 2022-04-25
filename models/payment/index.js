const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const paymentSchema = new Schema({
    base_fair: {
        type: Number,
        default: '',
    },
    total_distance: {
        type: Number,
        default: '',
    },
    ride_fair: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        default: '',
    },
    discount: {
        type: Number,

    },
    total_amt: {
        type: Number,

    },
    payment_method: {
        type: String,

    },
    payment_status: {
        type: String,

    },
    transaction_id: {
        type: Object,

    },
    promocode_id: {
        type: Object,

    },
});

// passport local mongoose plugin

paymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
