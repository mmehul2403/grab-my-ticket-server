const mongoose = require("mongoose");
const SeatSchemaMongo = require("./SeatSchemaMongo");

const OrderSchemaMongo = new mongoose.Schema({
  showTimeId: {
    type: Number,
    required: true,
  },
  ticketNum: {
    type: Number,
    required: true,
  },
  seats: {
    type: [SeatSchemaMongo],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchemaMongo);
module.exports = Order;
