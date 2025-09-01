const { Gift, Game, User } = require('../models');

exports.send = async (req, res) => {
    const { toId, gameId, message } = req.body;
    const to = await User.findByPk(toId);
    if (!to) return res.status(404).json({ message: 'Recipient not found' });
    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    const g = await Gift.create({ fromId: req.user.id, toId, gameId, message });
    res.status(201).json(g);
};

exports.my = async (req, res) => {
    const list = await Gift.findAll({ where: { toId: req.user.id } });
    res.json(list);
};
