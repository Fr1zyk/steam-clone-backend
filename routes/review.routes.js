// routes/review.routes.js
const Router = require('express').Router;
const {
    createReview,
    getGameReviews,
    updateReview,
    deleteReview
} = require('../controllers/review.controller');
const auth = require('../middleware/auth.middleware');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Отзывы и рейтинги игр
 */

/**
 * @swagger
 * /api/reviews/{gameId}:
 *   get:
 *     summary: Получить отзывы по игре
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID игры
 *     responses:
 *       200:
 *         description: Массив отзывов
 */
router.get('/:gameId', getGameReviews);

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
 *             type: object
 *             required:
 *               - gameId
 *               - rating
 *               - text
 *             properties:
 *               gameId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Отзыв создан
 */
router.post('/', auth, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Обновить свой отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Отзыв обновлён
 */
router.put('/:id', auth, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Удалить свой отзыв
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Отзыв удалён
 */
router.delete('/:id', auth, deleteReview);

module.exports = router;
