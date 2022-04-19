const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const userSchema = new Schema({
    fullname: {
        type: String,
        default: '',
    },
    token: {
        type: String,
        default: '',
    },
    email_id: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        default: '',
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
    },
});

// passport local mongoose plugin
userSchema.plugin(passportLocalMongoose, { usernameField: 'email_id' });
userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
