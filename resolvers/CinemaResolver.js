const { Op } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);

const CinemaResolver = {
  Query: {
    queryCinemaBy: async (_, args) => {
      let cinema_name = args.cinema_name;
      if (!cinema_name) {
        return await Cinema.findAll();
      }
      return await Cinema.findAll({
        where: {
          cinema_name: {
            [Op.substring]: cinema_name,
          },
        },
      });
    },
    queryCinemaById: async (_, args) => {
      return await Cinema.findByPk(args.cinema_id);
    },
  },

  Mutation: {
    createCinema: async (_, args) => {
      let newCinema = args.cinema;

      return { code: 0, message: "success", data: await Cinema.create(newCinema) };
    },
    updateCinema: async (_, args) => {
      const cinema = await Cinema.findByPk(args.cinema.cinema_id);
      if (!cinema) throw new Error("Cinema not found");
      await cinema.update(args.cinema);
      return { code: 0, message: "success", data: cinema };
    },
    deleteCinema: async (_, args) => {
      const cinema = await Cinema.findByPk(args.cinema_id);
      if (!cinema) throw new Error("Cinema not found");
      await cinema.destroy();
      return { code: 0, message: "success", data: cinema };
    },
  },
};

module.exports = CinemaResolver;
