const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Friend = sequelize.define('Friend', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'friends' });

module.exports = Friend;
