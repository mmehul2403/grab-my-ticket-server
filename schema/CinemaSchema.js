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

  input CinemaInputCreate {
   
    cinema_name: String
    cinema_address: String
    telephone_number: String
  }
  input CinemaInputUpdate {
    cinema_id: Int,
    cinema_name: String
    cinema_address: String
    telephone_number: String
  }
  
  type Query {
    queryCinemaBy(cinema_name: String): [Cinema]
    queryCinemaById(cinema_id: Int!): Cinema
  }

  type Mutation {
    createCinema(cinema: CinemaInputCreate!): Result
    updateCinema(cinema: CinemaInputUpdate!): Result
    deleteCinema(cinema_id: Int!): Result
    
  }
`;

module.exports = CinemaSchema;
