const sequelizeDatabase = require("../config/database");
const Movie = require("../models/Movie")(sequelizeDatabase);
const { GraphQLUpload } = require("graphql-upload");
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../uploads/movie_poster_images/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const MovieResolver = {
  Upload: GraphQLUpload,

  Query: {
    movie: async (parent, { movie_id }) => {
      return await Movie.findByPk(movie_id);
    },
    movies: async (parent, args, ctx) => {
      const { page = 1, size = 10 } = args;
      const limit = size;
      const offset = (page - 1) * limit;
      const { rows } = await Movie.findAndCountAll({ limit, offset });
      return rows;
    },
    getTop8Movies: async (_) => {
      return Movie.findAll({
        order: [["likes", "DESC"]],
        limit: 8,
      });
    },
    moviesOptions: async (_, __) => {
      return Movie.findAll();
    },
  },

  Mutation: {
    createMovie: async (parent, { movie_name, duration_seconds, release_date, review_score, file, description, likes }) => {
      let image_url = null;
      if (file) {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const fileName = `${filename}`;
        const filePath = path.join(uploadDir, fileName);
        image_url = `uploads/movie_poster_images/${fileName}`;

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          stream.pipe(writeStream).on("finish", resolve).on("error", reject);
        });
      }

      const movie = await Movie.create({
        movie_name,
        duration_seconds,
        release_date,
        review_score,
        image_url,
        description,
        likes,
      });
      return movie.dataValues;
    },

    updateMovie: async (parent, { movie_id, movie_name, duration_seconds, release_date, review_score, file, description, likes }) => {
      const movie = await Movie.findByPk(movie_id);
      if (!movie) throw new Error("Movie not found");

      let image_url = movie.image_url;
      if (file) {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const fileName = `${filename}`;
        const filePath = path.join(uploadDir, fileName);
        image_url = uploadDir + `/${fileName}`;

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          stream.pipe(writeStream).on("finish", resolve).on("error", reject);
        });
      }

      await movie.update({
        movie_name,
        duration_seconds,
        release_date,
        review_score,
        image_url,
        description,
        likes,
      });

      return movie;
    },

    deleteMovie: async (parent, { movie_id }) => {
      const movie = await Movie.findByPk(movie_id);
      if (!movie) throw new Error("Movie not found");
      await movie.destroy();
      return movie;
    },
  },
};

module.exports = MovieResolver;
