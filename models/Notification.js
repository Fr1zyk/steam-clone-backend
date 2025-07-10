// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notification = sequelize.define('Notification', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type:   { type: DataTypes.STRING,  allowNull: false },
    text:   { type: DataTypes.TEXT,    allowNull: false },
    read:   { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'notifications',
    timestamps: true
});

module.exports = Notification;
