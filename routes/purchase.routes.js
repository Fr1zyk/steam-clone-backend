// routes/purchase.routes.js
const Router = require('express').Router;
const { createPurchase, getUserPurchases } = require('../controllers/purchase.controller');
const auth = require('../middleware/auth.middleware');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Покупки игр
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Совершить покупку
 *     tags: [Purchases]
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
 *             properties:
 *               gameId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Покупка совершена
 */
router.post('/', auth, createPurchase);

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     summary: Получить свои покупки
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив покупок
 */
router.get('/', auth, getUserPurchases);

module.exports = router;
