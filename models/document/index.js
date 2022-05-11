const mongoose = require('mongoose');

const { Schema } = mongoose;
// loading passport local mongoose
// it will taken care of unique username and password with hash & salt
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate');

const documentSchema = new Schema({

    driving_licence: {
        type: String,
        default: '',
    },
    vehicle_insurance: {
        type: String,
        default: '',
    },
    aadhar_card: {
        type: String,
        default: '',
    },
    pan_card: {
        type: String,
        default: '',
    },
    aadhar_number: {
        type: String,
        default: '',
    },
    pan_card_number: {
        type: String,
        default: '',
    },

});

// passport local mongoose plugin

documentSchema.plugin(mongoosePaginate);

const Document = mongoose.model('Document', documentSchema, 'document');

module.exports = Document;
