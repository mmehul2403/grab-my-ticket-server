const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("grab_my_ticket", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
