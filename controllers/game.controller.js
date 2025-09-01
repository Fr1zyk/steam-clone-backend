const { Op } = require('sequelize');
const { Game } = require('../models');

exports.list = async (req, res) => {
    const { q, genre, sort='id', order='ASC', limit=50, offset=0 } = req.query;
    const where = {};
    if (q) where.title = { [Op.iLike]: `%${q}%` };
    if (genre) where.genre = genre;
    const games = await Game.findAll({ where, order: [[sort, order]], limit: +limit, offset: +offset });
    res.json(games);
};

exports.get = async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ message: 'Not found' });
    res.json(game);
};

exports.create = async (req, res) => {
    const game = await Game.create(req.body);
    res.status(201).json(game);
};

exports.update = async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ message: 'Not found' });
    await game.update(req.body);
    res.json(game);
};

exports.remove = async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ message: 'Not found' });
    await game.destroy();
    res.json({ ok: true });
};
