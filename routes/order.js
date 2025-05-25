// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');


// Dummy authentication middleware (replace with your real one)
function isAuthenticated(req, res, next) {
    if (req.session && req.session.username) {
      return next();
    } else {
      return res.redirect('/login'); // not logged in → redirect to login
    }
  }
  

// Save order to DB
router.post('/place-order', isAuthenticated, async (req, res) => {
  try {
    const orderData = {
      username: req.session.username, // assumed login username stored in session
      itemName: req.body.itemName,
      price: req.body.price,
      quantity: req.body.quantity,
      totalAmount: req.body.totalAmount,
      paymentType: req.body.paymentType.toLowerCase(),
      delivery_Address: req.body.delivery_Address,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});
router.get('/my-orders', isAuthenticated, async (req, res) => {
    try {
      const orders = await Order.find({ username: req.session.username }).sort({ createdAt: -1 });
      res.render('orders', { orders }); // ✅ This tells Express to render orders.ejs
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  
  module.exports = router;