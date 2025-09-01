const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gift = sequelize.define('Gift', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fromId: { type: DataTypes.INTEGER, allowNull: false },
    toId: { type: DataTypes.INTEGER, allowNull: false },
    gameId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING }
}, { tableName: 'gifts' });

module.exports = Gift;
