const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Cinema = sequelize.define("Cinema", {
    cinema_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cinema_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cinema_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cinema_city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Cities", // 'Cities' refers to table name
        key: "city_id",
      },
    },
    cinema_province_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Provinces",
        key: "province_id",
      },
    },
    telephone_number: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
  });

  Cinema.associate = (models) => {
    Cinema.belongsTo(models.City, {
      foreignKey: "cinema_city_id",
      as: "city",
    });
    Cinema.belongsTo(models.Province, {
      foreignKey: "cinema_province_id",
      as: "province",
    });
    // Cinema.belongsTo(models.ShowTime, {
    //   foreignKey: "cinema_id",
    //   as: "showtimes",
    // });
  };

  return Cinema;
};
