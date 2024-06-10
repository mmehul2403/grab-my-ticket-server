const { gql } = require("apollo-server-express");

const MovieSchema = gql`
  scalar Date

  type Movie {
    movie_id: Int!
    movie_name: String
    duration_seconds: Int
    release_date: Date
    review_score: Float
    image_url: String
  }

  type Query {
    movie(movie_id: Int!): Movie
    movies(page: Int, size: Int): [Movie]
  }

  type Mutation {
    createMovie(
      movie_name: String!
      duration_seconds: Int
      release_date: Date
      review_score: Float
      image_url: String
    ): Movie
    updateMovie(
      movie_id: Int!
      movie_name: String
      duration_seconds: Int
      release_date: Date
      review_score: Float
      image_url: String
    ): Movie
    deleteMovie(movie_id: Int!): Movie
  }
`;

module.exports = MovieSchema;
