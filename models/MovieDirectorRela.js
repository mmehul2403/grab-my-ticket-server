const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MovieDirectorRela = sequelize.define("MovieDirectorRela", {
    movie_director_rela_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return MovieDirectorRela;
};
