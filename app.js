// app.js
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const { sequelize } = require('./models');
const { swaggerUi, specs } = require('./config/swagger');

// импорт роутов
const authRoutes         = require('./routes/auth.routes');
const gameRoutes         = require('./routes/game.routes');
const profileRoutes      = require('./routes/profile.routes');
const purchaseRoutes     = require('./routes/purchase.routes');
const reviewRoutes       = require('./routes/review.routes');
const wishlistRoutes     = require('./routes/wishlist.routes');
const friendRoutes       = require('./routes/friend.routes');
const chatRoutes         = require('./routes/chat.routes');
const giftRoutes         = require('./routes/gift.routes');
const notificationRoutes = require('./routes/notification.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Роуты
app.use('/api/auth',          authRoutes);
app.use('/api/games',         gameRoutes);
app.use('/api/profile',       profileRoutes);
app.use('/api/purchases',     purchaseRoutes);
app.use('/api/reviews',       reviewRoutes);
app.use('/api/wishlist',      wishlistRoutes);
app.use('/api/friends',       friendRoutes);
app.use('/api/chat',          chatRoutes);
app.use('/api/gifts',         giftRoutes);
app.use('/api/notifications', notificationRoutes);

// Тестовый корневой маршрут
app.get('/', (req, res) => res.send('API работает ✔'));

const PORT = process.env.PORT || 5000;
sequelize.sync()
    .then(() => {
        console.log('🎉 DB connected');
        app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
    })
    .catch(err => console.error('❌ DB connection error:', err));
