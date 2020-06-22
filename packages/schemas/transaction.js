const mongoose = require('mongoose');
const { getTransactionType } = require('pando-constants');
const { Schema } = mongoose;
const schemaOptions = {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
function getRequestObject() {
    return {
        method: String,
        url: String,
        headers: {
            accept: String,
            'content-type': String,
            'user-agent': String,
            'content-length': Number,
            host: String,
            connection: String,
        },
        body: Object,
    };
}

const TransactionSchema = Schema({
        client: {type : String, required: true},
        type: { type: String, enum: Object.values(getTransactionType()), required: true, },
        request: Object(getRequestObject()),
        response: {
            status: String,
            code: Number,
            errors: [Object],
        },
    }, schemaOptions);
module.exports = TransactionSchema;
