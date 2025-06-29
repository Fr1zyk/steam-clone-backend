// controllers/game.controller.js

const Game = require('../models/Game');

/**
 * Создать новую игру
 */
exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        return res.status(201).json(game);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

/**
 * Получить список всех игр
 */
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        return res.json(games);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Получить одну игру по ID
 */
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        return res.json(game);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Обновить игру по ID
 */
exports.updateGame = async (req, res) => {
    try {
        const [updated] = await Game.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Game not found' });
        }
        const updatedGame = await Game.findByPk(req.params.id);
        return res.json(updatedGame);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

/**
 * Удалить игру по ID
 */
exports.deleteGame = async (req, res) => {
    try {
        const deleted = await Game.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Game not found' });
        }
        return res.json({ message: 'Game deleted' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
