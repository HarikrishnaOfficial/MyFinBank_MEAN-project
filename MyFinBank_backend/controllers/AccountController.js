const Account = require('../models/Account');
const User = require('../models/User')

// Controller function to create a new account
exports.createAccount = async (req, res) => {
    try {
        const { email, account_type, balance } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if the user is an admin
        if (user.isAdmin) {
            return res.status(409).json({ error: 'For Admins cannot create accounts' });
        }
        
        // Check if the user already has an account
        const existingAccount = await Account.findOne({ user_id: user._id });
        if (existingAccount) {
            return res.status(400).json({ error: 'User already has an account' });
        }
        
        // Create account for the user
        const account = new Account({ user_id: user._id, account_type, balance });
        await account.save();
        
        res.status(201).json({ message: 'Account created successfully', account });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controller function to get all accounts
exports.getAllAccounts = async (req, res) => {
    try {
        // Find all accounts and populate user information
        const accounts = await Account.find({}).populate('user_id', 'username email');
        // Map accounts to include only necessary information
        const formattedAccounts = accounts.map(account => ({
            _id: account._id,
            account_type: account.account_type,
            balance: account.balance,
            username: account.user_id ? account.user_id.username : null,
            email: account.user_id ? account.user_id.email : null
        }));
        

        res.status(200).json(formattedAccounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAccountsByUserId = async (req, res) => {
    try {
        const { id } = req.params; // Assuming userId is passed as a parameter
        const accounts = await Account.find({ user_id: id }); // Querying accounts based on user_id
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this user' });
        }
        res.status(200).json(accounts);
    } catch (error) {
        console.error("Error:", error); // Log any errors encountered during execution
        res.status(500).json({ error: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const { acc_id } = req.params; // Assuming userId is passed as a parameter
        const accounts = await Account.find({ _id: acc_id }); // Querying accounts based on user_id
        res.status(200).json(accounts);
    } catch (error) {
        console.error("Error:", error); // Log any errors encountered during execution
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update an account
exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const account = await Account.findByIdAndUpdate(id, updateData, { new: true });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account updated successfully', account });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete an account
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
