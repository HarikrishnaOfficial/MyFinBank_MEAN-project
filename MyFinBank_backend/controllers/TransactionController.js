const Transaction = require('../models/Transaction');

// Controller function to create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { user_id,account_id, transaction_type, amount, receiver_acc, transaction_date, status } = req.body;

        // Create a new transaction instance
        const transaction = new Transaction({user_id, account_id, transaction_type, amount,receiver_acc, transaction_date, status });

        // Save the transaction to the database
        await transaction.save();

        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller function to get a transaction by User ID
exports.getTransactionByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const transaction = await Transaction.find({user_id:user_id});
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a transaction
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const transaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
