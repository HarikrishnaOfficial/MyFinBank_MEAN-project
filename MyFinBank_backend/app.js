const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors')

const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');
const loanRoutes = require('./routes/loan');
const emiRoutes  = require('./routes/emi');
const fixedDepositeRoutes = require('./routes/fixedDeposite');
const reccuringDepositeRoutes = require('./routes/reccuringDeposite');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(express.json());
app.use(cors({
    "origin":"http://localhost:4200"
}))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_fin_bank')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/', userRoutes);
app.use('/',accountRoutes);
app.use('/',transactionRoutes);
app.use('/',loanRoutes);
app.use('/',emiRoutes);
app.use('/',fixedDepositeRoutes);
app.use('/',reccuringDepositeRoutes);
app.use('/',chatRoutes);





//node mailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iamchittyrobot@gmail.com', // Replace with your email address
        pass: 'bahf azwc gell dqor' // Replace with your email password or app-specific password
    }
});

const Account = require('../../MyFinBank_Application/MyFinBank_backend/models/Account');
const User = require('../../MyFinBank_Application/MyFinBank_backend/models/User');
const { TokenExpiredError } = require('jsonwebtoken');


// API endpoint to send an email when balance is 0
app.post('/send-email-balance-zero', async (req, res) => {
    try {
        // Find accounts with balance equal to 0
        const accounts = await Account.find({ balance: 0 }).populate('user_id');

        // Iterate over each account and send an email
        for (const account of accounts) {
            const userEmail = account.user_id.email; // Assuming 'email' field exists in User collection
            console.log(userEmail)
            const mailOptions = {
                from: 'iamchittyrobot@gmail.com', // Sender address
                to: userEmail, // Recipient address
                subject: 'MyFinBank Balance Alert', // Subject line
                text: `Your account balance is 0. Please take necessary action.` // Plain text body
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Failed to send emails' });
    }
});

// API endpoint to send zero balance emails list to admins
app.post('/send-zero-balance-emails-to-admins', async (req, res) => {
    try {
        // Find accounts with balance equal to 0 and populate the user_id field
    const zeroBalanceAccounts = await Account.find({ balance: 0 }).populate('user_id', 'email');

    // Extract email addresses of zero balance users
    const zeroBalanceEmails = zeroBalanceAccounts.map(account => account.user_id.email);

        // Find admins
        const admins = await User.find({ isAdmin: true }, 'email');

        // Extract email addresses of admins
        const adminEmails = admins.map(admin => admin.email);

        // Send emails to admins
        for (const adminEmail of adminEmails) {
            const mailOptions = {
                from: 'iamchittyrobot@gmail.com', // Sender address
                to: adminEmail, // Admin email address
                subject: 'MyFinBank List of Users with Zero Balance', // Subject line
                text: zeroBalanceEmails.join('\n') // Plain text body
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to admin:', error);
                } else {
                    console.log('Email sent to admin:', info.response);
                }
            });
        }

        res.status(200).json({ message: 'Zero balance emails list sent to admins' });
    } catch (error) {
        console.error('Error sending zero balance emails list to admins:', error);
        res.status(500).json({ error: 'Failed to send zero balance emails list to admins' });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
