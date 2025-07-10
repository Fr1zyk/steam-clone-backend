const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Game = require('./Game');

const Purchase = sequelize.define('purchase', {
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
    tableName: 'purchases',
    timestamps: true
});

// Создаем связи
User.hasMany(Purchase, { foreignKey: 'userId' });
Game.hasMany(Purchase, { foreignKey: 'gameId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = Purchase;
