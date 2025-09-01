require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('./models'); // associations

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));


app.get('/', (req, res) => res.json({ ok: true, name: 'steam-clone-api' }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/games', require('./routes/games.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/purchases', require('./routes/purchases.routes'));
app.use('/api/wishlist', require('./routes/wishlist.routes'));
app.use('/api/friends', require('./routes/friends.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/gifts', require('./routes/gifts.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));

// Health
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ db: 'ok' });
  } catch (e) {
    res.status(500).json({ db: 'error', error: e.message });
  }
});

module.exports = app;
