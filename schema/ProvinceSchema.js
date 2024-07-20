/**
 * @description City schema for adding provinces
 * @author Mehul
 * @date 2024-07-20
 */
const { gql } = require("apollo-server-express");

const ProvinceSchema = gql`
  type Province {
    province_id: Int!
    province_name: String
    cities: [City]
    cinemas: [Cinema]
  }

  type City {
    city_id: Int!
    city_name: String
    province: Province
    cinemas: [Cinema]
  }

  type Cinema {
    cinema_id: Int!
    cinema_name: String
    cinema_address: String
    telephone_number: String
    city: City
    province: Province
  }

  type Query {
    provinces: [Province]
    province(province_id: Int!): Province
  }

  type Mutation {
    createProvince(province_name: String!): Province
    updateProvince(province_id: Int!, province_name: String): Province
    deleteProvince(province_id: Int!): Boolean
  }
`;

module.exports = ProvinceSchema;
