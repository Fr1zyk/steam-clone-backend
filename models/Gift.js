// models/Gift.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gift = sequelize.define('Gift', {
    fromId: { type: DataTypes.INTEGER, allowNull: false },
    toId:   { type: DataTypes.INTEGER, allowNull: false },
    gameId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('pending','accepted','rejected'), defaultValue: 'pending' }
}, {
    tableName: 'gifts',
    timestamps: true
});

module.exports = Gift;
