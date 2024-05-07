const EMI = require('../models/EMI');

exports.createEMI = async (req, res) => {
    try {
        const { loan_id, emi_amount, due_date, status } = req.body;

        const emi = new EMI({ loan_id, emi_amount, due_date, status });
        await emi.save();

        res.status(201).json({ message: 'EMI created successfully', emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEMIs = async (req, res) => {
    try {
        const emis = await EMI.find();
        res.status(200).json(emis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEMIById = async (req, res) => {
    try {
        const { id } = req.params;
        const emi = await EMI.findById(id);
        if (!emi) {
            return res.status(404).json({ message: 'EMI not found' });
        }
        res.status(200).json(emi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEMI = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const emi = await EMI.findByIdAndUpdate(id, updateData, { new: true });
        if (!emi) {
            return res.status(404).json({ message: 'EMI not found' });
        }
        res.status(200).json({ message: 'EMI updated successfully', emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEMI = async (req, res) => {
    try {
        const { id } = req.params;
        const emi = await EMI.findByIdAndDelete(id);
        if (!emi) {
            return res.status(404).json({ message: 'EMI not found' });
        }
        res.status(200).json({ message: 'EMI deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
