const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderSeatRela = sequelize.define("OrderSeatRela", {
    order_seat_rela_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return OrderSeatRela;
};
