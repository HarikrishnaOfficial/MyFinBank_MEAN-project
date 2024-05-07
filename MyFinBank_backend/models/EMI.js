const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emiSchema = new Schema({
    loan_id: { type: Schema.Types.ObjectId, ref: 'Loan', required: true },
    emi_amount: { type: Number, required: true },
    due_date: { type: Date, required: true },
    status: { type: String, required: true }
});

const EMI = mongoose.model('EMI', emiSchema);

module.exports = EMI;
