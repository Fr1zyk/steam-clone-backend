const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Notification = sequelize.define('Notification', {
    text:     { type: DataTypes.STRING, allowNull: false },
    read:     { type: DataTypes.BOOLEAN, defaultValue: false }
});
Notification.associate = ({ User }) => {
    Notification.belongsTo(User);
};
module.exports = Notification;