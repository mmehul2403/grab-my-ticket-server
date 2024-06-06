const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const City = sequelize.define("City", {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    city_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });

  return City;
};
