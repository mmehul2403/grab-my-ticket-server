const { Op, where } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const ShowTime = require("../models/ShowTime")(sequelizeDatabase);
const Movie = require("../models/Movie")(sequelizeDatabase);
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
      const queryDate = new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2]);

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
    getShowTimeByCinemaId: async (_, args) => {
      let cinema_id = args.cinema_id;
      if (!cinema_id) {
        return [];
      }

      const { page = 1, size = 10 } = args;
      const limit = size;
      const offset = page * limit;
      const { rows } = await ShowTime.findAndCountAll({
        limit,
        offset,
        where: {
          cinema_id: {
            [Op.eq]: cinema_id,
          },
        },
      });
      return rows;
      // return show_times;
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
    movie: async (showtime) => {
      return await Movie.findByPk(showtime.movie_id);
    },
  },
  ShowTimeOfMovie: {
    movie: async (showtime) => {
      return await Movie.findByPk(showtime.movie_id);
    },
  },
  Mutation: {
    createShowTime: async (_, args) => {
      let srcShowTime = args.show_time;

      let dateArr = srcShowTime.show_date.split("-");
      srcShowTime.show_date = new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2]);
      return await ShowTime.create(srcShowTime);
    },
    updateShowTime: async (_, args) => {
      const show_time_id = args.show_time_id;
      const show_time = args.show_time;
      let srcShowTime = await ShowTime.findByPk(show_time_id);

      if (!srcShowTime) {
        return;
      }
      srcShowTime.seat_count = show_time.seat_count ?? srcShowTime.seat_count;
      srcShowTime.ticket_price = show_time.ticket_price ?? srcShowTime.ticket_price;
      let show_date = show_time.show_date ?? srcShowTime.show_date;

      let dateArr = show_date.split("-");
      srcShowTime.show_date = new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2]);
      srcShowTime.show_start_time = show_time.show_start_time ?? srcShowTime.show_start_time;
      srcShowTime.show_end_time = show_time.show_end_time ?? srcShowTime.show_end_time;
      srcShowTime.available_seat_count = show_time.available_seat_count ?? srcShowTime.available_seat_count;
      srcShowTime.movie_id = show_time.movie_id ?? srcShowTime.movie_id;

      return await srcShowTime.save();
    },
    deleteShowTime: async (_, { show_time_id }) => {
      const show_time = await ShowTime.findByPk(show_time_id);
      if (!show_time) throw new Error("ShowTime not found");
      await show_time.destroy();
      return true;
    },
  },
};

module.exports = ShowTimeResolver;
