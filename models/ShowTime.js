const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShowTime = sequelize.define("ShowTime", {
    show_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
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
    ticket_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    show_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    show_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    show_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  });

  return ShowTime;
};
