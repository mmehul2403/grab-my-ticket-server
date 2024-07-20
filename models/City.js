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
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Provinces", // 'Provinces' refers to table name
        key: "province_id",
      },
    },
  });

  City.associate = (models) => {
    City.belongsTo(models.Province, {
      foreignKey: "province_id",
      as: "province",
    });
    City.hasMany(models.Cinema, {
      foreignKey: "cinema_city_id",
      as: "cinemas",
    });
  };

  return City;
};
