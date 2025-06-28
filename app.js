// app.js
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const sequelize = require('./config/db');

// Импорт маршрутов
const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение роутов
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

// Тестовый корневой маршрут
app.get('/', (req, res) => {
    res.send('API работает ✔');
});

// Синхронизация с БД и запуск сервера
const PORT = process.env.PORT || 5000;
sequelize
    .sync()
    .then(() => {
        console.log('🎉 DB connected');
        app.listen(PORT, () => {
            console.log(`🚀 Server on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Ошибка подключения к БД:', err);
    });
