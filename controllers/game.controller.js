// controllers/game.controller.js
const { Game } = require('../models');

/**
 * GET /api/games
 */
exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/games/:id
 */
exports.getGameById = async (req, res, next) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/games
 */
exports.createGame = async (req, res, next) => {
    try {
        const g = await Game.create(req.body);
        res.status(201).json(g);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/games/:id
 */
exports.updateGame = async (req, res, next) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        await game.update(req.body);
        res.json(game);
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /api/games/:id
 */
exports.deleteGame = async (req, res, next) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        await game.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
};
