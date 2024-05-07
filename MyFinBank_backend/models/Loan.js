const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    account_id: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    loan_amount: { type: Number, required: true },
    interest_rate: { type: Number, default: 10, required: true },
    months: { type: Number, required: true },
    emi: { type: Number, required: true },
    status: { type: String, required: true }
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
