// models/Wishlist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wishlist = sequelize.define('Wishlist', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    gameId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'wishlists',
    timestamps: true
});

module.exports = Wishlist;
