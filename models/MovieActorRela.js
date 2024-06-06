const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MovieActorRela = sequelize.define("MovieActorRela", {
    movie_actor_rela_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return MovieActorRela;
};
