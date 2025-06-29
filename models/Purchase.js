const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Purchase = sequelize.define('Purchase', {});
Purchase.associate = ({ User, Game }) => {
    User.belongsToMany(Game, { through: Purchase });
    Game.belongsToMany(User, { through: Purchase });
};
module.exports = Purchase;