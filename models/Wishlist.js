const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wishlist = sequelize.define('Wishlist', {});
Wishlist.associate = ({ User, Game }) => {
    User.belongsToMany(Game, { through: Wishlist, as: 'Wishlisted' });
};
module.exports = Wishlist;