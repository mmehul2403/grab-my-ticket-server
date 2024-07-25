const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderTable = sequelize.define("OrderTable", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ticket_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    book_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    show_time_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  OrderTable.associate = (models) => {
    OrderTable.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    OrderTable.belongsTo(models.ShowTime, {
      foreignKey: "show_time_id",
      as: "showtime",
    });
  };
  return OrderTable;
};
