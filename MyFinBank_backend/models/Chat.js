const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    reply:{ type: String, default: 'Dear user you will get a reply soon. thank you!' },
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
