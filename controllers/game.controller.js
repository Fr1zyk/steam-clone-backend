
const Game = require('../models/Game');

// GET /api/games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /api/games/:id
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// POST /api/games
exports.createGame = async (req, res) => {
    try {
        const { title, developer, description, price } = req.body;
        const newGame = await Game.create({ title, developer, description, price });
        res.status(201).json(newGame);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT /api/games/:id
exports.updateGame = async (req, res) => {
    try {
        const { title, developer, description, price } = req.body;
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        await game.update({ title, developer, description, price });
        res.json(game);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE /api/games/:id
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        await game.destroy();
        res.json({ message: 'Game deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
