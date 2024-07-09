const { Sequelize } = require("sequelize");
const config = require("./database_config.json")[
  process.env.NODE_ENV || "MehulDevelopment"
];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
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
