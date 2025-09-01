const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Game = sequelize.define('Game', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    developer: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    genre: { type: DataTypes.STRING },
    screenshots: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    videoUrl: { type: DataTypes.STRING }
}, { tableName: 'games' });

module.exports = Game;
