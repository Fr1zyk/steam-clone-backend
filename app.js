require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Роуты
const authRoutes         = require('./routes/auth.routes');
const userRoutes         = require('./routes/user.routes');
const gameRoutes         = require('./routes/game.routes');
const reviewRoutes       = require('./routes/review.routes');
const purchaseRoutes     = require('./routes/purchase.routes');
const wishlistRoutes     = require('./routes/wishlist.routes');
const giftRoutes         = require('./routes/gift.routes');
const notificationRoutes = require('./routes/notification.routes');
const friendRoutes       = require('./routes/friend.routes');
const chatRoutes         = require('./routes/chat.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение роутов
app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/games',        gameRoutes);
app.use('/api/reviews',      reviewRoutes);
app.use('/api/purchases',    purchaseRoutes);
app.use('/api/wishlist',     wishlistRoutes);
app.use('/api/gifts',        giftRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/friends',      friendRoutes);
app.use('/api/chat',         chatRoutes);

// Тест
app.get('/', (req, res) => res.send('API работает ✔'));

// Запуск
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
});