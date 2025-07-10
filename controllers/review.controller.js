// controllers/review.controller.js
const { Review, User } = require('../models');

/**
 * GET /api/reviews?gameId=…
 */
exports.getByGame = async (req, res, next) => {
    try {
        const gameId = parseInt(req.query.gameId);
        const list = await Review.findAll({
            where: { gameId },
            include: [{ model: User, attributes: ['id','nickname'] }],
            order: [['createdAt','DESC']]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/reviews
 */
exports.leave = async (req, res, next) => {
    try {
        const { gameId, rating, comment } = req.body;
        const review = await Review.create({ userId: req.user.id, gameId, rating, comment });
        res.status(201).json(review);
    } catch (err) {
        next(err);
    }
};
