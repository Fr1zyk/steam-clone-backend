const { Review, Game } = require('../models');

exports.forGame = async (req, res) => {
    const list = await Review.findAll({ where: { gameId: req.params.gameId } });
    res.json(list);
};

exports.create = async (req, res) => {
    const { gameId, rating, comment } = req.body;
    const existsGame = await Game.findByPk(gameId);
    if (!existsGame) return res.status(400).json({ message: 'Game not found' });
    const review = await Review.create({ userId: req.user.id, gameId, rating, comment });
    res.status(201).json(review);
};
