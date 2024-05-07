const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
    try {
        const { user_id, message } = req.body;

        const chat = new Chat({ user_id, message });
        await chat.save();

        res.status(201).json({ message: 'Chat created successfully', chat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatById = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatByUserId = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.find({user_id:chatId});
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const updateData = req.body;
        const chat = await Chat.findByIdAndUpdate(chatId, updateData, { new: true });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat updated successfully', chat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findByIdAndDelete(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
