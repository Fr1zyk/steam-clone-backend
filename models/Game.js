// models/Game.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Game = sequelize.define('Game', {
    title:       { type: DataTypes.STRING, allowNull: false },
    developer:   { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price:       { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
}, {
    tableName: 'games',
    timestamps: true
});

module.exports = Game;
