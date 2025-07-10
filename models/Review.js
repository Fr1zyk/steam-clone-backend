// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    gameId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
    comment: { type: DataTypes.TEXT }
}, {
    tableName: 'reviews',
    timestamps: true
});

module.exports = Review;
