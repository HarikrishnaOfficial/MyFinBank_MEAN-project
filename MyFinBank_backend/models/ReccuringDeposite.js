const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recurringDepositSchema = new Schema({
    account_id: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    deposit_amount: { type: Number, required: true },
    interest_rate: { type: Number, required: true },
    status: { type: String, required: true }
});

const RecurringDeposit = mongoose.model('RecurringDeposit', recurringDepositSchema);

module.exports = RecurringDeposit;
