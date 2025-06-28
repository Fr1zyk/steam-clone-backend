// middleware/auth.middleware.js

// Подключаем dotenv, чтобы считать JWT_SECRET из .env
require('dotenv').config();

const jwt = require('jsonwebtoken');


module.exports = function authMiddleware(req, res, next) {
    // Заголовок вида "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Отсутствует заголовок Authorization' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Неправильный формат заголовка Authorization' });
    }

    const token = parts[1];
    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        // Проверяем и декодируем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Кладём данные из токена в объект запроса
        req.user = decoded;
        next();
    } catch (err) {
        // Если верификация не прошла
        return res.status(403).json({ error: 'Неверный или просроченный токен' });
    }
};
