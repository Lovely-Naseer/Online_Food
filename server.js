const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Razorpay Credentials (Replace with your actual keys)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Discount Calculation
function calculateDiscount(amount) {
    if (amount >= 1000) return amount * 0.10; // 10% discount
    if (amount >= 500 && amount < 1000) return amount * 0.05; // 5% discount
    if (amount >= 200 && amount < 500) return 100; // Free ice cream worth ₹100
    return 0;
}

// API to Create Order
app.post("/create-order", async (req, res) => {
    try {
        let { amount } = req.body;
        let discount = calculateDiscount(amount);
        let finalAmount = amount - discount;

        const options = {
            amount: finalAmount * 100, // Razorpay uses paise
            currency: "INR",
            receipt: order_rcptid_`${Math.floor(Math.random() * 10000)}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order, discount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating order", error });
    }
});

// API to Verify Payment (Webhook)
app.post("/verify-payment", async (req, res) => {
    // Handle payment verification logic (Razorpay Webhook Integration)
    res.json({ success: true, message: "Payment verified" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", `${PORT}`));

