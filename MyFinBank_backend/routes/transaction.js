const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');

const authMid = require('../middlewares/authMiddleware')

// Route to create a new transaction
router.post('/transactions', transactionController.createTransaction);

// Route to get all transactions
router.get('/transactions'  , transactionController.getAllTransactions);

// Route to get a transaction by ID
router.get('/transactions/:id', transactionController.getTransactionById);

//Route to get transactions by user id
router.get('/user/transactions/:user_id',transactionController.getTransactionByUserId);

// Route to update a transaction
router.put('/transactions/:id', transactionController.updateTransaction);

// Route to delete a transaction
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
