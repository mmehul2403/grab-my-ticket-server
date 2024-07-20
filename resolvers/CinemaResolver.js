const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const City = require("../models/City")(sequelizeDatabase);
const Province = require("../models/Province")(sequelizeDatabase);

const CinemaResolver = {
  Query: {
    cinemas: async () => {
      return await Cinema.findAll();
    },
    cinema: async (_, { cinema_id }) => {
      return await Cinema.findByPk(cinema_id);
    },
  },
  Mutation: {
    createCinema: async (
      _,
      {
        cinema_name,
        cinema_address,
        cinema_city_id,
        cinema_province_id,
        telephone_number,
      }
    ) => {
      return await Cinema.create({
        cinema_name,
        cinema_address,
        cinema_city_id,
        cinema_province_id,
        telephone_number,
      });
    },
    updateCinema: async (
      _,
      {
        cinema_id,
        cinema_name,
        cinema_address,
        cinema_city_id,
        cinema_province_id,
        telephone_number,
      }
    ) => {
      const cinema = await Cinema.findByPk(cinema_id);
      if (!cinema) throw new Error("Cinema not found");
      if (cinema_name !== undefined) cinema.cinema_name = cinema_name;
      if (cinema_address !== undefined) cinema.cinema_address = cinema_address;
      if (cinema_city_id !== undefined) cinema.cinema_city_id = cinema_city_id;
      if (cinema_province_id !== undefined)
        cinema.cinema_province_id = cinema_province_id;
      if (telephone_number !== undefined)
        cinema.telephone_number = telephone_number;
      await cinema.save();
      return cinema;
    },
    deleteCinema: async (_, { cinema_id }) => {
      const cinema = await Cinema.findByPk(cinema_id);
      if (!cinema) throw new Error("Cinema not found");
      await cinema.destroy();
      return true;
    },
  },
  Cinema: {
    city: async (cinema) => {
      return await City.findByPk(cinema.cinema_city_id);
    },
    province: async (cinema) => {
      return await Province.findByPk(cinema.cinema_province_id);
    },
  },
};

module.exports = CinemaResolver;
