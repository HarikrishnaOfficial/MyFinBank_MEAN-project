const RecurringDeposit = require('../models/ReccuringDeposite');

exports.createRecurringDeposit = async (req, res) => {
    try {
        const { account_id, deposit_amount, interest_rate, status } = req.body;

        const recurringDeposit = new RecurringDeposit({ account_id, deposit_amount, interest_rate, status });
        await recurringDeposit.save();

        res.status(201).json({ message: 'Recurring deposit created successfully', recurringDeposit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRecurringDeposits = async (req, res) => {
    try {
        const recurringDeposits = await RecurringDeposit.find();
        res.status(200).json(recurringDeposits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecurringDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const recurringDeposit = await RecurringDeposit.findById(id);
        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring deposit not found' });
        }
        res.status(200).json(recurringDeposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecurringDepositByAccountId = async (req, res) => {
    try {
        const { id } = req.params;
        const recurringDeposit = await RecurringDeposit.find({account_id:id});
        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring deposit not found' });
        }
        res.status(200).json(recurringDeposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRecurringDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const recurringDeposit = await RecurringDeposit.findByIdAndUpdate(id, updateData, { new: true });
        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring deposit not found' });
        }
        res.status(200).json({ message: 'Recurring deposit updated successfully', recurringDeposit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRecurringDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const recurringDeposit = await RecurringDeposit.findByIdAndDelete(id);
        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring deposit not found' });
        }
        res.status(200).json({ message: 'Recurring deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
