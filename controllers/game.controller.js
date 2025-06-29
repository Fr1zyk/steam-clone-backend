
const Game = require('../models/Game');

exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const [updated] = await Game.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ error: 'Game not found' });
        const updatedGame = await Game.findByPk(req.params.id);
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const deleted = await Game.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Game not found' });
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
