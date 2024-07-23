const { Op, where } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const ShowTime = require("../models/ShowTime")(sequelizeDatabase);

const ShowTimeResolver = {
  Query: {
    getShowTimeByMovieId: async (_, args) => {
      let movie_id = args.movie_id;
      if (!movie_id) {
        return [];
      }
      let show_times = await ShowTime.findAll({
        where: {
          movie_id: {
            [Op.eq]: movie_id,
          },
        },
      });

      return show_times;
    },
  },
  MovieCinemaShowTime: {
    cinema_name: async (cinema) => {
      return (await Cinema.findByPk(cinema.cinema_id)).cinema_name;
    },
    cinema_address: async (cinema) => {
      return (await Cinema.findByPk(cinema.cinema_id)).cinema_address;
    },
    show_times: async (showtime) => {
      return await ShowTime.findAll({
        where: {
          cinema_id: showtime.cinema_id,
          movie_id: showtime.movie_id,
        },
      });
    },
  },
};

module.exports = ShowTimeResolver;
