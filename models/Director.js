const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Director = sequelize.define("Director", {
    director_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Director;
};
