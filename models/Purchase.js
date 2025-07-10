// models/Purchase.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
    userId: {
        type: DataTypes.INTEGER, allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER, allowNull: false
    }
}, {
    tableName: 'purchases',
    timestamps: true
});

module.exports = Purchase;
