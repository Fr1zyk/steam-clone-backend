const Review = require('../models/Review');
const User   = require('../models/User');
const Game   = require('../models/Game');

exports.getByGame = async (req, res, next) => {
    try {
        const gameId = parseInt(req.query.gameId, 10);
        if (!gameId) return res.status(400).json({ error: 'gameId required in query' });

        const list = await Review.findAll({
            where: { gameId },
            include: [
                { model: User, attributes: ['id','nickname'] }
            ],
            order: [['createdAt','DESC']]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

exports.leave = async (req, res, next) => {
    try {
        const { gameId, rating, comment } = req.body;
        if (!gameId || !rating) {
            return res.status(400).json({ error: 'gameId and rating required' });
        }
        if (rating < 1 || rating > 10) {
            return res.status(400).json({ error: 'rating must be 1–10' });
        }

        // Проверяем, что игра существует
        const game = await Game.findByPk(gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });

        // Создаем отзыв
        const review = await Review.create({
            userId: req.user.id,
            gameId,
            rating,
            comment: comment || null
        });
        res.status(201).json(review);
    } catch (err) {
        next(err);
    }
};
