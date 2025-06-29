const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User   = require('../models/User');

exports.validateAuth = (method) => {
    switch (method) {
        case 'register':
            return [
                body('email').isEmail().withMessage('Неверный формат email'),
                body('password').isLength({ min: 6 }).withMessage('Пароль >= 6 символов'),
                body('nickname').optional().isString()
            ];
        case 'login':
            return [
                body('email').isEmail().withMessage('Неверный формат email'),
                body('password').notEmpty().withMessage('Пароль обязателен')
            ];
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const { email, password, nickname } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash, nickname });
        res.status(201).json({ id: user.id, email: user.email, nickname: user.nickname });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Неверный пароль' });

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};