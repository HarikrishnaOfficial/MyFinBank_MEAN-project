const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMid = require('../middlewares/authMiddleware')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/customers',authMid,UserController.customers);
router.put('/editCustomer/:id',authMid,UserController.editCustomerById);

module.exports = router;
