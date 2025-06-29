const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Gift = sequelize.define('Gift', {
    message: { type: DataTypes.TEXT }
});
Gift.associate = ({ User, Game }) => {
    Gift.belongsTo(User, { as: 'FromUser' });
    Gift.belongsTo(User, { as: 'ToUser' });
    Gift.belongsTo(Game);
};
module.exports = Gift;