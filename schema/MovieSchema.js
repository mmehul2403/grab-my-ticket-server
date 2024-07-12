const { gql } = require("apollo-server-express");

const MovieSchema = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Movie {
    movie_id: ID!
    movie_name: String!
    duration_seconds: Int!
    release_date: String!
    review_score: Float!
    image_url: String
  }

  type Query {
    movie(movie_id: ID!): Movie
    movies(page: Int, size: Int): [Movie]
  }

  type Mutation {
    createMovie(
      movie_name: String!
      duration_seconds: Int!
      release_date: String!
      review_score: Float!
      file: Upload
    ): Movie
    updateMovie(
      movie_id: ID!
      movie_name: String
      duration_seconds: Int
      release_date: String
      review_score: Float
      file: Upload
    ): Movie
    deleteMovie(movie_id: ID!): Movie
  }
`;

module.exports = MovieSchema;
