import Stripe from 'stripe';
import { PaymentPlan, Payment } from '../models/payment.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Function to create payment order
export const createPaymentOrder = async (req, res) => {
    const { planType } = req.body;
    const userId = req.id;

    const plans = {
        basic: { price: 299, jobLimit: 1 },
        standard: { price: 799, jobLimit: 3 },
        premium: { price: 1499, jobLimit: -1 },
    };

    if (!plans[planType]) {
        return res.status(400).json({
            message: "Invalid plan type.",
            success: false,
        });
    }

    const selectedPlan = plans[planType];

    try {
        // Create a new payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: selectedPlan.price * 100, // Amount in cents
            currency: 'inr',
            metadata: { planType, userId },
        });

        console.log("Payment Intent Created:", paymentIntent.id);

        // Create payment order record in the database
        await Payment.create({
            userId,
            paymentOrderId: paymentIntent.id,
            amount: selectedPlan.price,
            currency: 'inr',
            planType,
            planDetails: selectedPlan,
            paymentStatus: "pending",
        });

        return res.status(201).json({
            message: "Payment order created successfully.",
            clientSecret: paymentIntent.client_secret, // Send clientSecret back to frontend
            success: true,
        });
    } catch (error) {
        console.error("Error creating payment order:", error); // More detailed logging
        return res.status(500).json({
            message: "Error creating payment order.",
            success: false,
        });
    }
};


// Verify payment
export const verifyPayment = async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log("Payment Intent Retrieved:", paymentIntent.status);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                message: "Payment verification failed.",
                success: false,
            });
        }

        const paymentOrder = await Payment.findOne({ paymentOrderId: paymentIntent.id });
        if (!paymentOrder) {
            return res.status(404).json({
                message: "Payment order not found.",
                success: false,
            });
        }

        paymentOrder.paymentStatus = "success";
        paymentOrder.paymentId = paymentIntent.id;
        paymentOrder.paymentSignatureVerified = true;

        const paymentPlan = await PaymentPlan.create({
            adminId: paymentOrder.userId,
            planType: paymentOrder.planType,
            jobLimit: paymentOrder.planDetails.jobLimit,
            price: paymentOrder.amount,
            active: true,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        await paymentOrder.save();

        return res.status(200).json({
            message: "Payment verified and plan activated.",
            success: true,
            planDetails: paymentPlan,
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};
