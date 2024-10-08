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
    movie: MovieDetail
  }

  type Cinema {
    cinema_id: Int
    cinema_name: String
    cinema_address: String
    telephone_number: String
  }

  type ShowTimeOfMovie {
    show_time_id: Int
    seat_count: Int
    ticket_price: Float
    show_date: String
    show_start_time: String
    show_end_time: String
    available_seat_count: Int
    movie: MovieDetail
  }
  type MovieDetail {
    movie_id: Int
    movie_name: String
  }

  input ShowTimeInput {
    cinema_id: Int
    movie_id: Int
    seat_count: Int
    ticket_price: Float
    show_date: String
    show_start_time: String
    show_end_time: String
    available_seat_count: Int
  }
  type Query {
    getShowTimeByMovieId(movie_id: Int!, queryDate: String!): [MovieCinemaShowTime]
    getShowTimeDetailById(showtime_id: Int!): ShowTimeOfCinema
    getShowTimeByCinemaId(cinema_id: Int!, page: Int, size: Int, movie_id: Int, show_date: String): [ShowTimeOfMovie]
  }

  type Mutation {
    createShowTime(show_time: ShowTimeInput!): ShowTimeOfCinema
    updateShowTime(show_time_id: Int!, show_time: ShowTimeInput): ShowTimeOfCinema
    deleteShowTime(show_time_id: Int!): Boolean
  }
`;

module.exports = ShowTimeSchema;
