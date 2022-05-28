const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const otpSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: '',
    }

});

// passport local mongoose plugin

otpSchema.plugin(mongoosePaginate);

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
