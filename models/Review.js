const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review_title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    review_score: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  });

  return Review;
};
