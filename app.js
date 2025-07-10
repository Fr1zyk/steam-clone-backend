require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const swaggerUi     = require('swagger-ui-express');
const swaggerSpec   = require('./config/swagger');
const sequelize     = require('./config/db');

const authRoutes     = require('./routes/auth.routes');
const gameRoutes     = require('./routes/game.routes');
const profileRoutes  = require('./routes/profile.routes');
const purchaseRoutes = require('./routes/purchase.routes');
const reviewRoutes   = require('./routes/review.routes');
const wishlistRoutes = require('./routes/wishlist.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Маршруты
app.use('/api/auth',      authRoutes);
app.use('/api/games',     gameRoutes);
app.use('/api/profile',   profileRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/reviews',   reviewRoutes);
app.use('/api/wishlist',  wishlistRoutes);

// Тестовый маршрут
app.get('/', (req, res) => res.send('API работает ✔'));

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
sequelize.sync()
    .then(() => {
        console.log('🎉 DB connected');
        app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    })
    .catch(err => console.error('❌ DB connection failed:', err.message));
