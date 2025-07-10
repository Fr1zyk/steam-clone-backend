// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { User } = require('../models');

/**
 * POST /api/auth/register
 */
exports.register = async (req, res, next) => {
    try {
        const { email, password, nickname } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash, nickname });
        res.status(201).json({ id: user.id, email: user.email, nickname: user.nickname });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/login
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(403).json({ error: 'Wrong password' });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};
