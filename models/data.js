const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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

module.exports = Data;
