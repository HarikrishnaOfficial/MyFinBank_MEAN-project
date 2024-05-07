const express = require('express');
const router = express.Router();
const loanController = require('../controllers/LoanController');
const authMiddleware = require('../middlewares/authMiddleware')


// Route to create a new loan
router.post('/loans',authMiddleware, loanController.createLoan);

// Route to get all loans
router.get('/loans',authMiddleware, loanController.getAllLoans);

// Route to get a loan by ID
router.get('/loans/:id',authMiddleware, loanController.getLoanById);

router.get('/user/loans/:id',authMiddleware, loanController.getLoansByUserId);

// Route to update a loan
router.put('/loans/:id',authMiddleware, loanController.updateLoan);

// Route to delete a loan
router.delete('/loans/:id',authMiddleware, loanController.deleteLoan);

module.exports = router;
