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
      allowNull: true,
      default: "",
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      default: "",
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      default: "",
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      default: "",
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
      default: "",
    },
    role: {
      type: DataTypes.ENUM("User", "Cinema", "Admin"),
      allowNull: true,
      defaultValue: "User",
    },
    lock_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 0,
    },
  });

  return User;
};
