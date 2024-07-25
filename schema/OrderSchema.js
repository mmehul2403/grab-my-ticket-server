/**
 * @description OrderSchema is designed for operations definitions with the table Cinema
 * @author Emma
 * @date 2024-07-25
 */
const { gql } = require("apollo-server-express");
const ShowTimeSchema = require("../schema/ShowTimeSchema"); // 确保这个文件存在并且正确导出了 ShowTimeOfCinema 类型

const OrderSchema = gql`
  type OrderDetail {
    order_id: Int!
    ticket_num: Int
    ticket_amount: Float
    book_date: String
    show_time: ShowTimeOfCinema
  }

  type Query {
    getOrderDetail(order_id: Int!): OrderDetail
    getOrdersByUserId(user_id: Int!): [OrderDetail]
  }

  type Mutation {
    createOrder(ticket_num: Int!, ticket_amount: Float!, book_date: String!, show_time_id: Int): OrderDetail
  }
`;

module.exports = OrderSchema;
