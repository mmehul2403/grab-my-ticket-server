const { Sequelize } = require("sequelize");
const config = require("./database_config.json")[
  process.env.NODE_ENV || "mehul-dev"
];

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
  }
);

sequelize
  .query(`CREATE DATABASE IF NOT EXISTS ${config.database};`)
  .then(() => {
    console.log(`Database "${config.database}" created or already exists.`);
    return sequelize.authenticate();
  })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
