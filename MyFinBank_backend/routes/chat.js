const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/chats',authMiddleware, chatController.createChat);
router.get('/chats',authMiddleware, chatController.getAllChats);
router.get('/chats/:chatId',authMiddleware, chatController.getChatById);
router.get('/user/chats/:chatId',authMiddleware, chatController.getChatByUserId);
router.put('/chats/:chatId',authMiddleware, chatController.updateChat);
router.delete('/chats/:chatId',authMiddleware, chatController.deleteChat);

module.exports = router;
