const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

// Process Payment
exports.processPayment = async (req, res) => {
    const { email, amount, courseId, promoCode } = req.body;

    try {
        // Convert amount to kobo (Paystack uses amounts in kobo)
        const amountInKobo = amount * 100;

        // Initialize Paystack transaction
        const response = await paystack.transaction.initialize({
            email, // Customer's email
            amount: amountInKobo, // Amount in kobo
            metadata: {
                courseId, // Attach course ID to the transaction
                promoCode, // Attach promo code to the transaction
            },
        });

        // Return the Paystack authorization URL to the frontend
        res.json({
            success: true,
            authorizationUrl: response.data.authorization_url,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    const { reference } = req.body;

    try {
        // Verify the transaction using the reference
        const response = await paystack.transaction.verify(reference);

        if (response.data.status === 'success') {
            // Payment was successful
            res.json({
                success: true,
                message: 'Payment successful',
                data: response.data,
            });
        } else {
            // Payment failed
            res.status(400).json({
                success: false,
                message: 'Payment failed',
                data: response.data,
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};