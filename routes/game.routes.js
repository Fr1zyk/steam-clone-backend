const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame
} = require('../controllers/game.controller');

// Middleware для проверки входящих данных
const validateGame = [
    body('title').notEmpty().withMessage('Title обязательно'),
    body('developer').notEmpty().withMessage('Developer обязательно'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price должно быть числом ≥ 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

router.get('/', getAllGames);
router.get('/:id', getGameById);

// защищённые маршруты
router.post('/', validateGame, createGame);
router.put('/:id', validateGame, updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
