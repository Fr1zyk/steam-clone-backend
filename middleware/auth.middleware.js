// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ error: 'No token' });
    const token = h.split(' ')[1];
    try {
        const p = jwt.verify(token, process.env.JWT_SECRET);
        req.user = p;
        next();
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
};
