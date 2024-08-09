const { Op, where } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const ShowTime = require("../models/ShowTime")(sequelizeDatabase);
const moment = require("moment-timezone");
const ShowTimeResolver = {
  Query: {
    getShowTimeByMovieId: async (_, args) => {
      let movie_id = args.movie_id;
      let queryDateStr = args.queryDate;
      if (!movie_id) {
        return [];
      }

      let dateArr = queryDateStr.split("-");
      const queryDate = new Date(
        dateArr[0],
        parseInt(dateArr[1]) - 1,
        dateArr[2]
      );

      const startOfDay = new Date(queryDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(queryDate.setUTCHours(23, 59, 59, 999));
      let show_times = await ShowTime.findAll({
        where: {
          movie_id: {
            [Op.eq]: movie_id,
          },
          show_date: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      return show_times;
    },
    getShowTimeDetailById: async (_, args) => {
      return await ShowTime.findByPk(args.showtime_id);
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
  ShowTimeOfCinema: {
    cinema: async (showtime) => {
      return await Cinema.findByPk(showtime.cinema_id);
    },
  },
};

module.exports = ShowTimeResolver;
