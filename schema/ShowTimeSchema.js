/**
 * @description ShowTimeSchema is designed for operations with the table showTimes
 * @author Emma
 * @date 2024-07-23
 */
const { gql } = require("apollo-server-express");

const ShowTimeSchema = gql`
  type MovieCinemaShowTime {
    cinema_id: Int
    cinema_name: String
    cinema_address: String
    show_times: [ShowTime]
  }
  type ShowTime {
    show_time_id: Int
    seat_count: Int
    ticket_price: Float
    show_date: String
    show_start_time: String
    show_end_time: String
  }

  type ShowTimeOfCinema {
    show_time_id: Int
    seat_count: Int
    ticket_price: Float
    show_date: String
    show_start_time: String
    show_end_time: String
    available_seat_count: Int
    cinema: Cinema
  }

  type Cinema {
    cinema_id: Int
    cinema_name: String
    cinema_address: String
    telephone_number: String
  }

  type Query {
    getShowTimeByMovieId(movie_id: Int!): [MovieCinemaShowTime]
    getShowTimeDetailById(showtime_id: Int!): ShowTimeOfCinema
  }
`;

module.exports = ShowTimeSchema;
