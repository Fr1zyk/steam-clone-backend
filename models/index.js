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

// Purchases
User.hasMany(Purchase, { foreignKey: 'userId', onDelete: 'CASCADE' });
Purchase.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Purchase, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Purchase.belongsTo(Game, { foreignKey: 'gameId' });

// Reviews
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Review, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Review.belongsTo(Game, { foreignKey: 'gameId' });

// Wishlist
User.hasMany(Wishlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Game.hasMany(Wishlist, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Wishlist.belongsTo(Game, { foreignKey: 'gameId' });

// Friends (follow model)
User.hasMany(Friend, { as: 'Followings', foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Friend, { as: 'Followers', foreignKey: 'friendId', onDelete: 'CASCADE' });
Friend.belongsTo(User, { as: 'User', foreignKey: 'userId' });
Friend.belongsTo(User, { as: 'Friend', foreignKey: 'friendId' });

// Chat
User.hasMany(Chat, { as: 'SentMessages', foreignKey: 'fromId', onDelete: 'CASCADE' });
User.hasMany(Chat, { as: 'ReceivedMessages', foreignKey: 'toId', onDelete: 'CASCADE' });
Chat.belongsTo(User, { as: 'From', foreignKey: 'fromId' });
Chat.belongsTo(User, { as: 'To', foreignKey: 'toId' });

// Gifts
User.hasMany(Gift, { as: 'GiftsSent', foreignKey: 'fromId', onDelete: 'CASCADE' });
User.hasMany(Gift, { as: 'GiftsReceived', foreignKey: 'toId', onDelete: 'CASCADE' });
Gift.belongsTo(User, { as: 'From', foreignKey: 'fromId' });
Gift.belongsTo(User, { as: 'To', foreignKey: 'toId' });
Game.hasMany(Gift, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Gift.belongsTo(Game, { foreignKey: 'gameId' });

// Notifications
User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Game, Purchase, Review, Wishlist, Friend, Chat, Gift, Notification };
