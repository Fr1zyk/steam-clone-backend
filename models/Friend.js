// models/Friend.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Friend = sequelize.define('Friend', {
    userId:   { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'friends',
    timestamps: true
});

module.exports = Friend;
