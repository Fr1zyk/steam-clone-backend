
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const sequelize = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API работает ✔'));

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

// глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
sequelize.sync()
    .then(() => app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`)))
    .catch(err => console.error('DB connection failed:', err.message));
