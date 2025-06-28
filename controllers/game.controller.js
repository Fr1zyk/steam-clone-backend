const Game = require('../models/Game');

exports.getAll = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { title, developer, description, price } = req.body;
        const game = await Game.create({ title, developer, description, price });
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Game.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: 'Game not found' });
        const game = await Game.findByPk(id);
        res.json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Game.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: 'Game not found' });
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
