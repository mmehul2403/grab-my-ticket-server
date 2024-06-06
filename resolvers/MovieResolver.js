const sequelizeDatabase = require("../config/database");
const Movie = require("../models/Movie")(sequelizeDatabase);

const MovieResolver = {
  Query: {
    movie: async (parent, args) => {
      return await Movie.findByPk(args.movie_id);
    },
    movies: async (parent, args) => {
      const { page = 1, size = 10 } = args;
      const limit = size;
      const offset = (page - 1) * limit;
      const movies = await Movie.findAndCountAll({ limit, offset });
      return movies.rows;
    },
  },
  Mutation: {
    createMovie: async (parent, args) => {
      return await Movie.create(args);
    },
    updateMovie: async (parent, args) => {
      const movie = await Movie.findByPk(args.movie_id);
      if (!movie) throw new Error("Movie not found");
      await movie.update(args);
      return movie;
    },
    deleteMovie: async (parent, args) => {
      const movie = await Movie.findByPk(args.movie_id);
      if (!movie) throw new Error("Movie not found");
      await movie.destroy();
      return movie;
    },
  },
};

module.exports = MovieResolver;
