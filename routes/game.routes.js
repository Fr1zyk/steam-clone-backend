const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { createGame, getAllGames, getGameById, updateGame, deleteGame } = require('../controllers/game.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Валидация
const validateGame = [
    body('title').notEmpty().withMessage('Title обязателен'),
    body('developer').notEmpty().withMessage('Developer обязателен'),
    body('price').isFloat({ min: 0 }).withMessage('Price ≥ 0'),
    (req, res, next) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() });
        next();
    }
];

// Маршруты
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', authMiddleware, validateGame, createGame);
router.put('/:id', authMiddleware, validateGame, updateGame);
router.delete('/:id', authMiddleware, deleteGame);

module.exports = router;
