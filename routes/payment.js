const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/process-payment', auth, paymentController.processPayment);

module.exports = router;