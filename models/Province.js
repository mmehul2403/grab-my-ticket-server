const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Province = sequelize.define("Province", {
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });

  return Province;
};
