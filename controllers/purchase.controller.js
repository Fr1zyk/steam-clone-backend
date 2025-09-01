const { Purchase, Game } = require('../models');

exports.buy = async (req, res) => {
    const { gameId } = req.body;
    const game = await Game.findByPk(gameId);
    if (!game) return res.status(400).json({ message: 'Game not found' });
    const exists = await Purchase.findOne({ where: { userId: req.user.id, gameId } });
    if (exists) return res.status(400).json({ message: 'Already owned' });
    const p = await Purchase.create({ userId: req.user.id, gameId });
    res.status(201).json(p);
};

exports.my = async (req, res) => {
    const list = await Purchase.findAll({ where: { userId: req.user.id } });
    res.json(list);
};
