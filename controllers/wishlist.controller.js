const { Wishlist, Game } = require('../models');

exports.add = async (req, res) => {
    const { gameId } = req.params;
    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    const exists = await Wishlist.findOne({ where: { userId: req.user.id, gameId } });
    if (exists) return res.status(200).json(exists);
    const item = await Wishlist.create({ userId: req.user.id, gameId });
    res.status(201).json(item);
};

exports.remove = async (req, res) => {
    const { gameId } = req.params;
    const item = await Wishlist.findOne({ where: { userId: req.user.id, gameId } });
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ ok: true });
};

exports.my = async (req, res) => {
    const list = await Wishlist.findAll({ where: { userId: req.user.id } });
    res.json(list);
};
