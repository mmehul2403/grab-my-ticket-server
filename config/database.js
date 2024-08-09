const { Sequelize } = require("sequelize");
const config = require("./db_config.json")[process.env.NODE_ENV || "mehul-dev"];
const mysql_db = config.mysql;
const sequelize = new Sequelize(
  mysql_db.database,
  mysql_db.username,
  mysql_db.password,
  {
    host: mysql_db.host,
    dialect: mysql_db.dialect,
  }
);

const Province = require("../models/Province")(sequelize);
const City = require("../models/City")(sequelize);
const Cinema = require("../models/Cinema")(sequelize);

const models = {
  Province,
  City,
  Cinema,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize
  .query(`CREATE DATABASE IF NOT EXISTS ${mysql_db.database};`)
  .then(() => {
    console.log(`Database "${mysql_db.database}" created or already exists.`);
    return sequelize.authenticate();
  })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
