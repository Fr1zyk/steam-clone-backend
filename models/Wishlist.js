const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Game = require('./Game');

const Wishlist = sequelize.define('wishlist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Game, key: 'id' }
    },
}, {
    tableName: 'wishlists',
    timestamps: true
});

User.hasMany(Wishlist, { foreignKey: 'userId' });
Game.hasMany(Wishlist, { foreignKey: 'gameId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = Wishlist;
