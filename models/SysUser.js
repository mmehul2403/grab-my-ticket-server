const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SysUser = sequelize.define("SysUser", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    telephone_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });

  return SysUser;
};
