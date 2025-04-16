const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentType: { type: String, enum: ['card', 'upi'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
