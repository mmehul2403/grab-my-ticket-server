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
      allowNull: false,
    },
  });

  Province.associate = (models) => {
    Province.hasMany(models.City, {
      foreignKey: "province_id",
      as: "cities",
    });
    Province.hasMany(models.Cinema, {
      foreignKey: "cinema_province_id",
      as: "cinemas",
    });
  };

  return Province;
};
