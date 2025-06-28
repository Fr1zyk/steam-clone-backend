
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const sequelize= require('./config/db');
const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

// тестовый роут
app.get('/', (req, res) => res.send('API работает ✔'));

sequelize.sync().then(() => {
    console.log('🎉 DB connected');
    app.listen(process.env.PORT, () =>
        console.log(`🚀 Server on port ${process.env.PORT}`)
    );
});
