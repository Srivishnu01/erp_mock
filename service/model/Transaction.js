const mongoose = require('mongoose');

const { Model } = mongoose;
const { TransactionSchema } = require('schemas');

class Transaction extends Model {
}
module.exports = mongoose.model(Transaction, TransactionSchema, 'transaction');
