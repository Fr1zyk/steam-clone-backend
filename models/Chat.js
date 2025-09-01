const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Chat = sequelize.define('Chat', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fromId: { type: DataTypes.INTEGER, allowNull: false },
    toId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'chats' });

module.exports = Chat;
