const { gql } = require("apollo-server-express");

const OrderTypeDefs = gql`
  type Seat {
    row: String
    column: Int
  }

  type Order {
    id: ID!
    showTimeId: Int!
    ticketNum: Int!
    seats: [Seat]!
    totalPrice: Float!
    userId: Int!
    userEmail: String
    createdAt: String
  }

  type Query {
    getOrderByIdMongo(id: ID!): Order
    getAllOrdersMongo: [Order]
    getUserOrders(userId: Int!): [Order]
    getBookedSeats(showTimeId: Int!): [Seat]
  }

  type Mutation {
    createOrderMongo(
      showTimeId: Int!
      ticketNum: Int!
      seats: [SeatInput]!
      totalPrice: Float!
      userId: Int!
      userEmail: String
    ): Order
    updateOrderMongo(
      id: ID!
      ticketNum: Int!
      seats: [SeatInput]!
      totalPrice: Float!
      userId: Int
    ): Order
    deleteOrderMongo(id: ID!): String
  }

  input SeatInput {
    row: String
    column: Int
  }
`;

module.exports = OrderTypeDefs;
