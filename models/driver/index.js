const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const driverSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    email_id: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,

    },
    status: {
        type: String,

    },
    is_online: {
        type: Number,

    },
    parent_driver_id: {
        type: Object,

    },
    document_id: {
        type: Schema.Types.ObjectId,
        ref: 'Document'

    },
    fcm_token: {
        type: String,

    },

    google_id: {
        type: String,

    },

    bank_ac_id: {
        type: Object,
        ref: 'BankAccountDetails'
    },
    wallet_id: {
        type: Object,

    },
});

// passport local mongoose plugin
driverSchema.plugin(passportLocalMongoose, { usernameField: 'email_id' });
driverSchema.plugin(mongoosePaginate);

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
