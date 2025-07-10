// controllers/purchase.controller.js
const { Purchase, Game } = require('../models');

/**
 * GET /api/purchases
 */
exports.getMyPurchases = async (req, res, next) => {
    try {
        const list = await Purchase.findAll({
            where: { userId: req.user.id },
            include: [{ model: Game, attributes: ['id','title','price'] }]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/purchases
 */
exports.buyGame = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const exists = await Purchase.findOne({ where: { userId: req.user.id, gameId } });
        if (exists) return res.status(409).json({ error: 'Already purchased' });
        const p = await Purchase.create({ userId: req.user.id, gameId });
        res.status(201).json(p);
    } catch (err) {
        next(err);
    }
};
