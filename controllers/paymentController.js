const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process Payment
exports.processPayment = async (req, res) => {
    const { amount, currency, source, courseId, promoCode } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description: `Payment for course ${courseId}`
        });
        res.json(charge);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};