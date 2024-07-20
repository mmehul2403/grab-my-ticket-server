const sequelizeDatabase = require("../config/database");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const City = require("../models/City")(sequelizeDatabase);
const Province = require("../models/Province")(sequelizeDatabase);

const ProvinceResolver = {
  Query: {
    provinces: async () => {
      return await Province.findAll();
    },
    province: async (_, { province_id }) => {
      return await Province.findByPk(province_id);
    },
  },
  Mutation: {
    createProvince: async (_, { province_name }) => {
      console.log("province_name :" + province_name);
      return await Province.create({ province_name });
    },
    updateProvince: async (_, { province_id, province_name }) => {
      const province = await Province.findByPk(province_id);
      if (!province) throw new Error("Province not found");
      province.province_name = province_name;
      await province.save();
      return province;
    },
    deleteProvince: async (_, { province_id }) => {
      const province = await Province.findByPk(province_id);
      if (!province) throw new Error("Province not found");
      await province.destroy();
      return true;
    },
  },
  Province: {
    cities: async (province) => {
      return await City.findAll({
        where: { province_id: province.province_id },
      });
    },
    cinemas: async (province) => {
      return await Cinema.findAll({
        where: { cinema_province_id: province.province_id },
      });
    },
  },
};

module.exports = ProvinceResolver;
