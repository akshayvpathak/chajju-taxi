const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const transactionSchema = new Schema({
    type: {
        type: String,
        default: '',
    },
    from: {
        type: String,
        default: '',
    },

    to: {
        type: String,
        default: '',
    }

});

// passport local mongoose plugin

transactionSchema.plugin(mongoosePaginate);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
