const { Sequelize } = require("sequelize");
const dbconfig = require("./db_config.json")[process.env.NODE_ENV || "development"];
const mysqlConfig = dbconfig.mysql;
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: mysqlConfig.dialect,
});

sequelize
  .query(`CREATE DATABASE IF NOT EXISTS ${mysqlConfig.database};`)
  .then(() => {
    console.log(`Database "${mysqlConfig.database}" created or already exists.`);
    return sequelize.authenticate();
  })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
