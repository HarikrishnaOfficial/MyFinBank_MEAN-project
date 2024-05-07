const FixedDeposit = require('../models/FixedDeposite');

exports.createFixedDeposit = async (req, res) => {
    try {
        const { account_id, deposit_amount, interest_rate, status } = req.body;

        const fixedDeposit = new FixedDeposit({ account_id, deposit_amount, interest_rate, status });
        await fixedDeposit.save();

        res.status(201).json({ message: 'Fixed deposit created successfully', fixedDeposit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFixedDeposits = async (req, res) => {
    try {
        const fixedDeposits = await FixedDeposit.find();
        res.status(200).json(fixedDeposits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFixedDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const fixedDeposit = await FixedDeposit.findById(id);
        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed deposit not found' });
        }
        res.status(200).json(fixedDeposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getFixedDepositByAccountId = async (req, res) => {
    try {
        const { id } = req.params;
        const fixedDeposit = await FixedDeposit.find({account_id:id});
        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed deposit not found' });
        }
        res.status(200).json(fixedDeposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFixedDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const fixedDeposit = await FixedDeposit.findByIdAndUpdate(id, updateData, { new: true });
        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed deposit not found' });
        }
        res.status(200).json({ message: 'Fixed deposit updated successfully', fixedDeposit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFixedDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const fixedDeposit = await FixedDeposit.findByIdAndDelete(id);
        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed deposit not found' });
        }
        res.status(200).json({ message: 'Fixed deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
