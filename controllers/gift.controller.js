
const { Gift, Game, User } = require('../models');

/**
 * GET /api/gifts/sent
 */
exports.sent = async (req, res, next) => {
    try {
        const list = await Gift.findAll({
            where: { fromId: req.user.id },
            include: [{ model: Game }, { model: User, as: 'recipient', attributes:['id','email'] }]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/gifts/received
 */
exports.received = async (req, res, next) => {
    try {
        const list = await Gift.findAll({
            where: { toId: req.user.id },
            include: [{ model: Game }, { model: User, as: 'sender', attributes:['id','email'] }]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/gifts
 */
exports.send = async (req, res, next) => {
    try {
        const { toId, gameId } = req.body;
        const gift = await Gift.create({ fromId: req.user.id, toId, gameId });
        res.status(201).json(gift);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/gifts/:id/accept
 */
exports.accept = async (req, res, next) => {
    try {
        const g = await Gift.findByPk(req.params.id);
        g.status = 'accepted'; await g.save();
        res.json(g);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/gifts/:id/reject
 */
exports.reject = async (req, res, next) => {
    try {
        const g = await Gift.findByPk(req.params.id);
        g.status = 'rejected'; await g.save();
        res.json(g);
    } catch (err) {
        next(err);
    }
};
