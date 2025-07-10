// controllers/profile.controller.js
const fs    = require('fs');
const path  = require('path');
const { User, Purchase, Friend } = require('../models');

/**
 * GET /api/profile
 */
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id','email','nickname','avatarUrl','createdAt']
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/profile
 */
exports.updateProfile = async (req, res, next) => {
    try {
        const { nickname } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (nickname) user.nickname = nickname;
        if (req.file) {
            // удаляем старый аватар, если есть
            if (user.avatarUrl) {
                const old = path.join(__dirname, '..', user.avatarUrl);
                if (fs.existsSync(old)) fs.unlinkSync(old);
            }
            user.avatarUrl = `/uploads/${req.file.filename}`;
        }
        await user.save();

        res.json({
            id:        user.id,
            email:     user.email,
            nickname:  user.nickname,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/profile/purchases
 */
exports.getPurchaseHistory = async (req, res, next) => {
    try {
        const list = await Purchase.findAll({
            where: { userId: req.user.id },
            order: [['createdAt','DESC']]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/profile/friends
 */
exports.getFriends = async (req, res, next) => {
    try {
        const friends = await Friend.findAll({
            where: { userId: req.user.id },
            include: [{ model: User, as: 'friend', attributes:['id','nickname','avatarUrl'] }]
        });
        res.json(friends.map(f => f.friend));
    } catch (err) {
        next(err);
    }
};
