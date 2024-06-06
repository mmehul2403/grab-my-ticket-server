const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Data = sequelize.define("Data", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Data;
};
