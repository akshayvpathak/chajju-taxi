const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const bankAccountDetailsSchema = new Schema({

    bank_name: {
        type: String,
        default: '',
    },
    ifsc_code: {
        type: String,
        default: '',
    },
    account_number: {
        type: String,
        default: '',
    },
    account_holder: {
        type: String,
        default: '',
    },
    upi_id: {
        type: String,
        default: '',
    },
    paytm_number: {
        type: String,
        default: '',
    },
    prefer_payment_type: {
        type: String,
        default: '',
    },

});

// passport local mongoose plugin
bankAccountDetailsSchema.plugin(mongoosePaginate);

const BankAcDetails = mongoose.model('BankAccountDetails', bankAccountDetailsSchema);

module.exports = BankAcDetails;
