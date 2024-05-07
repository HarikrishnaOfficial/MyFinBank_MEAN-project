const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    account_id: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    transaction_type: { type: String, required: true },
    amount: { type: Number, required: true },
    receiver_acc:{type:String, required: true},
    transaction_date: { type: Date, default: Date.now },
    status: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
