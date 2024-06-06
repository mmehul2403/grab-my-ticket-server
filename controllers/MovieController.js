const Movie = require("../models/Movie")(require("../config/database"));

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.update(req.body);
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (page - 1) * limit;

    const movies = await Movie.findAndCountAll({
      limit,
      offset,
    });

    res.status(200).json({
      data: movies.rows,
      totalPages: Math.ceil(movies.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.destroy();
    res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
