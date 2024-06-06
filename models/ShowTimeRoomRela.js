const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShowTimeRoomRela = sequelize.define("ShowTimeRoomRela", {
    show_time_room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    show_time_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return ShowTimeRoomRela;
};
