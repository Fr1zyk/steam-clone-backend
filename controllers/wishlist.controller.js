// controllers/wishlist.controller.js
const { Wishlist, Game } = require('../models');

/**
 * GET /api/wishlist
 */
exports.getMyWishlist = async (req, res, next) => {
    try {
        const list = await Wishlist.findAll({
            where: { userId: req.user.id },
            include: [{ model: Game, attributes: ['id','title','price'] }]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/wishlist
 */
exports.addToWishlist = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const exists = await Wishlist.findOne({ where: { userId: req.user.id, gameId } });
        if (exists) return res.status(409).json({ error: 'Already in wishlist' });
        const w = await Wishlist.create({ userId: req.user.id, gameId });
        res.status(201).json(w);
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /api/wishlist/:id
 */
exports.removeFromWishlist = async (req, res, next) => {
    try {
        const w = await Wishlist.findByPk(req.params.id);
        if (!w || w.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
        await w.destroy();
        res.json({ message: 'Removed' });
    } catch (err) {
        next(err);
    }
};
