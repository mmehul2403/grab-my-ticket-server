const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SysUser = sequelize.define("User", {
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
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 0,
    },
    lock_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 0,
    },
  });

  return SysUser;
};
