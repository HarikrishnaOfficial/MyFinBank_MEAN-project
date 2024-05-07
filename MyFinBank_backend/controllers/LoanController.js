const Loan = require('../models/Loan');
const Account = require('../models/Account');
const User = require('../models/User');

// Controller function to create a new loan
exports.createLoan = async (req, res) => {
    try {
        const { account_id, loan_amount, interest_rate, months, status } = req.body;;

        // Find the account
        const account = await Account.findById(account_id);

        // Check if the account exists
        if (!account) {
            return res.status(400).json({ error: 'Account not found' });
        }

        // Find the user associated with the account
        const user = await User.findById(account.user_id);

        // Check if the user exists and is active
        if (!user || !user.isActive) {
            return res.status(400).json({ error: 'User is not active' });
        }

        // Check if there's an existing loan associated with the account ID
        const existingLoan = await Loan.findOne({ account_id });

        if (existingLoan) {
            return res.status(400).json({ error: 'A loan already exists for this account' });
        }

        // Calculate EMI
        const rate = interest_rate / (12 * 100); // Monthly interest rate
        const tenure = months;
        let emi = loan_amount * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
        emi = Math.round(emi);

        // Create a new loan instance
        const loan = new Loan({ account_id, loan_amount, interest_rate, months, emi, status });

        // Save the loan to the database
        await loan.save();

        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Controller function to get all loans with account balance
exports.getAllLoans = async (req, res) => {
    try {
        // Fetch all loans
        const loans = await Loan.find();

        // Fetch account balances for each loan concurrently
        const loansWithBalance = await Promise.all(loans.map(async loan => {
            try {
                // Find the account by accountId
                const account = await Account.findById(loan.account_id);

                // If account does not exist, throw an error
                if (!account) {
                    throw new Error('Account not found for loan with ID: ' + loan._id);
                }

                // Return loan details along with account balance
                return {
                    ...loan.toObject(), // Convert Mongoose document to plain object
                    balance: account.balance
                };
            } catch (error) {
                // Handle error within the map function
                return Promise.reject(error);
            }
        }));

        // Respond with loans and their balances
        res.status(200).json(loansWithBalance);
    } catch (error) {
        // Handle any uncaught errors
        res.status(500).json({ error: error.message });
    }
};



// Controller function to get a loan by ID
exports.getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a loan
exports.updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the loan by ID
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Update the loan data
        Object.assign(loan, updateData);

        // Recalculate EMI
        const rate = loan.interest_rate / (12 * 100); // Monthly interest rate
        const tenure = loan.months;
        let emi = loan.loan_amount * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
        emi = Math.round(emi);
        loan.emi = emi;

        // Save the updated loan
        await loan.save();

        res.status(200).json({ message: 'Loan updated successfully', loan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to delete a loan
exports.deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getLoansByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the account associated with the user_id
        const account = await Account.find({ user_id:id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found for the user' });
        }

        // Find loans associated with the account
        
        const loans = await Loan.find({ account_id: account[0]._id });
        
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

