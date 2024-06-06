const { DataTypes } = require("sequelize");

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
    telephone_number: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
  });

  return Cinema;
};
