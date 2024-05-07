const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const authMiddleware = require('../middlewares/authMiddleware')

// Route to create a new account
router.post('/accounts',authMiddleware, accountController.createAccount);

// Route to get all accounts
router.get('/accounts',authMiddleware, accountController.getAllAccounts);

// Route to get an account by user ID
router.get('/accounts/:id',authMiddleware, accountController.getAccountsByUserId);

// Route to get an account by ID
router.get('/accounts/account/:acc_id',authMiddleware, accountController.getAccountById);

// Route to update an account
router.put('/accounts/:id',authMiddleware, accountController.updateAccount);

// Route to delete an account
router.delete('/accounts/:id',authMiddleware, accountController.deleteAccount);

module.exports = router;