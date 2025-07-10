// controllers/friend.controller.js
const { Friend, User } = require('../models');

/**
 * GET /api/friends
 */
exports.list = async (req, res, next) => {
    try {
        const friends = await Friend.findAll({
            where: { userId: req.user.id },
            include: [{ model: User, as: 'friend', attributes:['id','nickname'] }]
        });
        res.json(friends.map(f=>f.friend));
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/friends
 */
exports.add = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const f = await Friend.create({ userId: req.user.id, friendId });
        res.status(201).json(f);
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /api/friends/:id
 */
exports.remove = async (req, res, next) => {
    try {
        await Friend.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
};
