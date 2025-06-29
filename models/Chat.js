const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Chat = sequelize.define('Chat', {
    room: { type: DataTypes.STRING, allowNull: false }
});
const Message = sequelize.define('Message', {
    text: { type: DataTypes.TEXT, allowNull: false }
});
Chat.associate = ({ User, Chat, Message }) => {
    Chat.belongsToMany(User, { through: 'ChatUsers' });
    Message.belongsTo(User);
    Message.belongsTo(Chat);
};
module.exports = { Chat, Message };