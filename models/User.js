const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    register_date: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    telephone_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    role: {
      type: DataTypes.ENUM("User", "Cinema", "Admin"),
      allowNull: false,
      defaultValue: "User",
    },
    lock_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.OrderTable, {
      foreignKey: "user_id",
      as: "order",
    });
  };

  return User;
};
