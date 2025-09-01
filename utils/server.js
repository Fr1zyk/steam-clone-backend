const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('✅ DB connected and synced');
        app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));
    } catch (e) {
        console.error('DB connection error:', e);
        process.exit(1);
    }
})();
