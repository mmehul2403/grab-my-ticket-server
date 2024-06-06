const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ScreenRoom = sequelize.define("ScreenRoom", {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return ScreenRoom;
};
