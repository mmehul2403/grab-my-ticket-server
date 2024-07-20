const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const City = require("../models/City")(sequelizeDatabase);
const Province = require("../models/Province")(sequelizeDatabase);

const CityResolver = {
  Query: {
    cities: async () => {
      return await City.findAll();
    },
    city: async (_, { city_id }) => {
      return await City.findByPk(city_id);
    },
  },
  Mutation: {
    createCity: async (_, { city_name, province_id }) => {
      return await City.create({ city_name, province_id });
    },
    updateCity: async (_, { city_id, city_name, province_id }) => {
      const city = await City.findByPk(city_id);
      if (!city) throw new Error("City not found");
      if (city_name !== undefined) city.city_name = city_name;
      if (province_id !== undefined) city.province_id = province_id;
      await city.save();
      return city;
    },
    deleteCity: async (_, { city_id }) => {
      const city = await City.findByPk(city_id);
      if (!city) throw new Error("City not found");
      await city.destroy();
      return true;
    },
  },
  City: {
    province: async (city) => {
      return await Province.findByPk(city.province_id);
    },
    cinemas: async (city) => {
      return await Cinema.findAll({
        where: { city_id: city.city_id },
      });
    },
  },
};

module.exports = CityResolver;
