const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Review = sequelize.define('Review', {
    rating:  { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT }
});
Review.associate = ({ User, Game }) => {
    Review.belongsTo(User); Review.belongsTo(Game);
};
module.exports = Review;