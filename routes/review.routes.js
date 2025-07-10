// routes/review.routes.js
const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const { getByGame, leave } = require('../controllers/review.controller');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Отзывы и рейтинг
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Получить отзывы по игре
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID игры для фильтрации
 *     responses:
 *       200:
 *         description: Список отзывов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', getByGame);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Оставить отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Отзыв создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post('/', auth, leave);

module.exports = router;
