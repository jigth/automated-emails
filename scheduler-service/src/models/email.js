const { Schema, model } = require('mongoose');

const emailSchema = new Schema({
    'from': {
        type: String,
        required: true
    },
    'to': {
        type: String,
        required: true
    },
    'subject': {
        type: String,
        required: true
    },
    'message': {
        type: String,
        required: true
    },
    'htmlMessage': String,
    'currStatus': {
        type: String,
        required: true
    },
    'expireDate': {
        type: Date,
        required: true
    },

});

module.exports = model('Email', emailSchema);
