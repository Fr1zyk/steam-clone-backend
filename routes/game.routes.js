
const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame
} = require('../controllers/game.controller');

const router = express.Router();

const validateGame = [
    body('title').notEmpty().withMessage('Поле "title" обязательно'),
    body('developer').notEmpty().withMessage('Поле "developer" обязательно'),
    body('price').isFloat({ min: 0 }).withMessage('Поле "price" должно быть числом >= 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    }
];

router.get('/',        getAllGames);
router.get('/:id',     getGameById);
router.post('/',       authMiddleware, validateGame, createGame);
router.put('/:id',     authMiddleware, validateGame, updateGame);
router.delete('/:id',  authMiddleware, deleteGame);

module.exports = router;
