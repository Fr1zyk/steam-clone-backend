require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ error: 'No Authorization header' });
    const [scheme, token] = h.split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Invalid auth format' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ error: 'Token invalid' });
    }
};