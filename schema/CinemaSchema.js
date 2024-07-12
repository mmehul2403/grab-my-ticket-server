/**
 * @description CinemaSchema is designed for operations definitions with the table Cinema
 * @author Emma
 * @date 2024-07-08
 */
const CinemaSchema = `#graphql
  type Cinema {
    cinema_id: Int!
    cinema_name: String
    cinema_address: String
    telephone_number: String
    
  }
  type Result{
    code:Int!,
    message:String!,
    data:Cinema
  }

  input CinemaInput {
    cinema_name: String
    cinema_address: String
    telephone_number: String
  }
  
  type Query {
    queryCinemaBy(cinema_name: String!): [Cinema]
    queryCinemaById(cinema_id: Int!): Cinema
  }

  type Mutation {
    createCinema(cinema: CinemaInput!): Result
    updateCinema(cicinema: Cinema!): Result
    deleteCinema(cinema_id: Int!): Result
    
  }
`;

module.exports = CinemaSchema;
