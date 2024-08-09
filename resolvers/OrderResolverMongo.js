// resolvers/OrderResolvers.js

const Order = require("../models/OrderSchemaMongo");

const OrderResolverMongo = {
  Query: {
    getOrderByIdMongo: async (_, { id }) => {
      return await Order.findById(id);
    },
    getAllOrdersMongo: async () => {
      return await Order.find();
    },
  },
  Mutation: {
    createOrderMongo: async (
      _,
      { showTimeId, ticketNum, seats, totalPrice }
    ) => {
      const newOrder = new Order({
        showTimeId,
        ticketNum,
        seats,
        totalPrice,
      });
      return await newOrder.save();
    },
    updateOrderMongo: async (_, { id, ticketNum, seats, totalPrice }) => {
      return await Order.findByIdAndUpdate(
        id,
        { ticketNum, seats, totalPrice },
        { new: true }
      );
    },
    deleteOrderMongo: async (_, { id }) => {
      await Order.findByIdAndDelete(id);
      return "Order deleted";
    },
  },
};

module.exports = OrderResolverMongo;
