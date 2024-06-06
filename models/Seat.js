const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Seat = sequelize.define("Seat", {
    seat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seat_row: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seat_column: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    seat_desc: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    occupied_flag: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Seat;
};
