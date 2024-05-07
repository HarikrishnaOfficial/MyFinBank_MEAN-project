const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ warning: 'User Already Exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, email });
            await user.save();
            res.status(201).json({ message: 'Registeration Successfull!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ warning: 'User Not Found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({
            userId:user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.customers = async (req, res) => {
    try {
        const customers = await User.find({}, '-password'); // Exclude the 'password' field
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.editCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, isAdmin, isActive } = req.body;

        // Find the customer by ID
        const customer = await User.findById(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Update the fields except for the password
        customer.username = username || customer.username;
        customer.email = email || customer.email;
        customer.isAdmin = isAdmin !== undefined ? isAdmin : customer.isAdmin;
        customer.isActive = isActive !== undefined ? isActive : customer.isActive;
        await customer.save();

        // Respond with the updated customer data
        res.status(200).json({ message: 'Customer updated successfully', customer });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
