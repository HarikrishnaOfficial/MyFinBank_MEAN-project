const express = require('express');
const router = express.Router();
const fixedDepositController = require('../controllers//FixedDepositeController');
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/fixedDeposits',authMiddleware,fixedDepositController.createFixedDeposit);
router.get('/fixedDeposits',authMiddleware, fixedDepositController.getAllFixedDeposits);
router.get('/fixedDeposits/:id',authMiddleware, fixedDepositController.getFixedDepositById);
router.get('/user/fixedDeposits/:id',authMiddleware, fixedDepositController.getFixedDepositByAccountId);
router.put('/fixedDeposits/:id',authMiddleware, fixedDepositController.updateFixedDeposit);
router.delete('/fixedDeposits/:id',authMiddleware, fixedDepositController.deleteFixedDeposit);

module.exports = router;
