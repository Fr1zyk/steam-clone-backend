const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Friend = sequelize.define('Friend', {});
Friend.associate = ({ User }) => {
    User.belongsToMany(User, { as: 'Friends', through: Friend, foreignKey: 'UserId', otherKey: 'FriendId' });
};
module.exports = Friend;