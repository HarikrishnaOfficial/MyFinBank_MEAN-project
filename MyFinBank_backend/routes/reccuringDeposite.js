const express = require('express');
const router = express.Router();
const recurringDepositController = require('../controllers/ReccuringDepositeController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/recurringDeposits',authMiddleware, recurringDepositController.createRecurringDeposit);
router.get('/recurringDeposits',authMiddleware, recurringDepositController.getAllRecurringDeposits);
router.get('/recurringDeposits/:id',authMiddleware, recurringDepositController.getRecurringDepositById);
router.get('/user/recurringDeposits/:id',authMiddleware, recurringDepositController.getRecurringDepositByAccountId);
router.put('/recurringDeposits/:id',authMiddleware, recurringDepositController.updateRecurringDeposit);
router.delete('/recurringDeposits/:id',authMiddleware, recurringDepositController.deleteRecurringDeposit);

module.exports = router;
