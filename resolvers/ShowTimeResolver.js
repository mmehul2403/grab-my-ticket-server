const { Op, where } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const ShowTime = require("../models/ShowTime")(sequelizeDatabase);
const Movie = require("../models/Movie")(sequelizeDatabase);
const momentTimeZone = require("moment-timezone");
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
      let movie_id = args.movie_id;
      let show_date = args.show_date;
      if (!cinema_id) {
        return [];
      }

      let filters = {
        cinema_id: {
          [Op.eq]: cinema_id,
        },
      };

      if (movie_id) {
        filters.movie_id = { [Op.eq]: movie_id };
      }
      if (show_date) {
        const queryDate = new Date(show_date.split("T")[0]);

        const startOfDay = new Date(queryDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(queryDate.setUTCHours(23, 59, 59, 999));
        filters.show_date = {
          [Op.between]: [startOfDay, endOfDay],
        };
      }

      const { page = 0, size = 10 } = args;
      const limit = size;
      const offset = page * limit;
      const { rows } = await ShowTime.findAndCountAll({
        limit,
        offset,
        where: filters,
      });
      return rows;
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
      srcShowTime.show_date = new Date(srcShowTime.show_date.split("T")[0]).setUTCHours(0, 0, 0, 0);
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
      srcShowTime.show_date = new Date(show_date.split("T")[0]);
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
