// models/index.js
const sequelize    = require('../config/db');
const User         = require('./User');
const Game         = require('./Game');
const Purchase     = require('./Purchase');
const Review       = require('./Review');
const Wishlist     = require('./Wishlist');
const Friend       = require('./Friend');
const Chat         = require('./Chat');
const Gift         = require('./Gift');
const Notification = require('./Notification');

// 1. User — Purchase
User.hasMany(Purchase,  { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Purchase,  { foreignKey: 'gameId' });
Purchase.belongsTo(Game, { foreignKey: 'gameId' });

// 2. User — Review
User.hasMany(Review,  { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Review,  { foreignKey: 'gameId' });
Review.belongsTo(Game, { foreignKey: 'gameId' });

// 3. User — Wishlist
User.hasMany(Wishlist,   { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Wishlist,   { foreignKey: 'gameId' });
Wishlist.belongsTo(Game, { foreignKey: 'gameId' });

// 4. User — Friend (двунаправленная связь)
User.hasMany(Friend,       { foreignKey: 'userId', as: 'myFriends' });
Friend.belongsTo(User,     { foreignKey: 'userId', as: 'owner' });
User.hasMany(Friend,       { foreignKey: 'friendId', as: 'followers' });
Friend.belongsTo(User,     { foreignKey: 'friendId', as: 'friend' });

// 5. User — Chat
User.hasMany(Chat,   { foreignKey: 'fromId', as: 'sentMessages' });
User.hasMany(Chat,   { foreignKey: 'toId',   as: 'receivedMessages' });
Chat.belongsTo(User, { foreignKey: 'fromId', as: 'from' });
Chat.belongsTo(User, { foreignKey: 'toId',   as: 'to' });

// 6. User — Gift
User.hasMany(Gift,   { foreignKey: 'fromId', as: 'giftsSent' });
User.hasMany(Gift,   { foreignKey: 'toId',   as: 'giftsReceived' });
Gift.belongsTo(User, { foreignKey: 'fromId', as: 'from' });
Gift.belongsTo(User, { foreignKey: 'toId',   as: 'to' });
Game.hasMany(Gift,   { foreignKey: 'gameId' });
Gift.belongsTo(Game, { foreignKey: 'gameId' });

// 7. User — Notification
User.hasMany(Notification,   { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    models: {
        User, Game, Purchase, Review,
        Wishlist, Friend, Chat, Gift, Notification
    }
};
