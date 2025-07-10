// models/Chat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Chat = sequelize.define('Chat', {
    fromId:  { type: DataTypes.INTEGER, allowNull: false },
    toId:    { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT,    allowNull: false }
}, {
    tableName: 'chats',
    timestamps: true
});

module.exports = Chat;
