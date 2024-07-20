/**
 * @description CinemaSchema is designed for operations definitions with the table Cinema
 * @author Emma & Mehul
 * @date 2024-07-08
 */
const { gql } = require("apollo-server-express");

const CinemaSchema = gql`
  type Cinema {
    cinema_id: Int!
    cinema_name: String
    cinema_address: String
    telephone_number: String
    city: City
    province: Province
  }

  type Query {
    cinemas: [Cinema]
    cinema(cinema_id: Int!): Cinema
  }

  type Mutation {
    createCinema(
      cinema_name: String!
      cinema_address: String!
      cinema_city_id: Int!
      cinema_province_id: Int!
      telephone_number: String
    ): Cinema
    updateCinema(
      cinema_id: Int!
      cinema_name: String
      cinema_address: String
      cinema_city_id: Int
      cinema_province_id: Int
      telephone_number: String
    ): Cinema
    deleteCinema(cinema_id: Int!): Boolean
  }
`;

module.exports = CinemaSchema;
