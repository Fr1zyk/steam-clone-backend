
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Game = require('./Game');

const Review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Game, key: 'id' }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 10 }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'reviews',
    timestamps: true
});

// Связи
User.hasMany(Review, { foreignKey: 'userId' });
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = Review;
