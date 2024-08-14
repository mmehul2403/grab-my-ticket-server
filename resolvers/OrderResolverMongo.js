const {
  SendOrderConfirmationEmail,
} = require("../config/sendOrderConfirmationEmail");
const Order = require("../models/OrderSchemaMongo");

const OrderResolverMongo = {
  Query: {
    getOrderByIdMongo: async (_, { id }) => {
      return await Order.findById(id);
    },
    getAllOrdersMongo: async () => {
      return await Order.find();
    },
    getUserOrders: async (_, { userId }) => {
      // Match the new query name
      return await Order.find({ userId });
    },
    getBookedSeats: async (_, { showTimeId }) => {
      const orders = await Order.find({ showTimeId });
      const bookedSeats = orders.reduce((acc, order) => {
        return acc.concat(order.seats);
      }, []);
      return bookedSeats;
    },
  },
  Mutation: {
    createOrderMongo: async (
      _,
      { showTimeId, ticketNum, seats, totalPrice, userId, userEmail }
    ) => {
      const existingOrders = await Order.find({ showTimeId });
      const bookedSeats = existingOrders.reduce((acc, order) => {
        return acc.concat(order.seats);
      }, []);
      const conflictingSeats = seats.filter((seat) =>
        bookedSeats.some(
          (bookedSeat) =>
            bookedSeat.row === seat.row && bookedSeat.column === seat.column
        )
      );
      console.log("UserEmail is : " + userEmail);
      if (conflictingSeats.length > 0) {
        throw new Error(
          `Seats ${conflictingSeats
            .map((seat) => `${seat.row}${seat.column}`)
            .join(", ")} are already booked.`
        );
      }

      const newOrder = new Order({
        showTimeId,
        ticketNum,
        seats,
        totalPrice,
        userId,
      });
      const savedOrder = await newOrder.save();
      //const userEmail = "mehulmakwana339@gmail.com"; // Replace with actual user email
      await SendOrderConfirmationEmail(userEmail, savedOrder);

      return savedOrder;
    },
    updateOrderMongo: async (
      _,
      { id, ticketNum, seats, totalPrice, userId }
    ) => {
      return await Order.findByIdAndUpdate(
        id,
        { ticketNum, seats, totalPrice, userId },
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
