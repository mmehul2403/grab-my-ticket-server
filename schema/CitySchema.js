/**
 * @description City schema for adding cities under provinces
 * @author Mehul
 * @date 2024-07-20
 */
const { gql } = require("apollo-server-express");

const CitySchema = gql`
  type City {
    city_id: Int!
    city_name: String
    province: Province
    cinemas: [Cinema]
  }

  type Query {
    cities: [City]
    city(city_id: Int!): City
  }

  type Mutation {
    createCity(city_name: String!, province_id: Int!): City
    updateCity(city_id: Int!, city_name: String, province_id: Int): City
    deleteCity(city_id: Int!): Boolean
  }
`;

module.exports = CitySchema;
