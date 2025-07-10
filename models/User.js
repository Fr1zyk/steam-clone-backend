
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    email:     { type: DataTypes.STRING, unique: true, allowNull: false },
    password:  { type: DataTypes.STRING, allowNull: false },
    nickname:  { type: DataTypes.STRING, allowNull: false },
    avatarUrl: { type: DataTypes.STRING }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
