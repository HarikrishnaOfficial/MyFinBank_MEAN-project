const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Account schema
const accountSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    account_type: { type: String, required: true },
    balance: { type: Number, required: true }
});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;
