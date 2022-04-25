const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const walletSchema = new Schema({
    driver_id: {
        type: Object,

    },
    amount: {
        type: Number,

    },

});

// passport local mongoose plugin
walletSchema.plugin(mongoosePaginate);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
