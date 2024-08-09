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
    createdAt: String
  }

  type Query {
    getOrderByIdMongo(id: ID!): Order
    getAllOrdersMongo: [Order]
  }

  type Mutation {
    createOrderMongo(
      showTimeId: Int!
      ticketNum: Int!
      seats: [SeatInput]!
      totalPrice: Float!
    ): Order
    updateOrderMongo(
      id: ID!
      ticketNum: Int!
      seats: [SeatInput]!
      totalPrice: Float!
    ): Order
    deleteOrderMongo(id: ID!): String
  }

  input SeatInput {
    row: String
    column: Int
  }
`;

module.exports = OrderTypeDefs;
