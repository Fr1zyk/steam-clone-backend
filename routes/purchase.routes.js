// routes/purchase.routes.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {
    getMyPurchases,
    buyGame
} = require('../controllers/purchase.controller');

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: История покупок
 */

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     summary: Получить все покупки текущего пользователя
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список покупок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */
router.get('/', auth, getMyPurchases);

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Купить игру
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Идентификатор игры для покупки
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [gameId]
 *             properties:
 *               gameId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Покупка совершена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       409:
 *         description: Игра уже куплена
 */
router.post('/', auth, buyGame);

module.exports = router;
