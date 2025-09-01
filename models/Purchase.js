const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    gameId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'purchases' });

module.exports = Purchase;
