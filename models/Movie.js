const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Movie = sequelize.define(
    "Movie",
    {
      movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "duration in the unit of second",
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      review_score: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "URL of the movie image",
      },
    },
    {
      tableName: "movie",
      timestamps: false,
    }
  );
  Movie.associate = (models) => {
    ShowTime.hasMany(models.ShowTime, {
      foreignKey: "movie_id",
      as: "showtimes",
    });
  };
  return Movie;
};
