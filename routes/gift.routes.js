// routes/gift.routes.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {
    sent,
    received,
    send: sendGift,
    accept,
    reject
} = require('../controllers/gift.controller');

/**
 * @swagger
 * tags:
 *   name: Gifts
 *   description: Подарки
 */

/**
 * @swagger
 * /api/gifts/sent:
 *   get:
 *     summary: Получить отправленные подарки
 *     tags: [Gifts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список отправленных подарков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gift'
 */
router.get('/sent', auth, sent);

/**
 * @swagger
 * /api/gifts/received:
 *   get:
 *     summary: Получить полученные подарки
 *     tags: [Gifts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список полученных подарков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gift'
 */
router.get('/received', auth, received);

/**
 * @swagger
 * /api/gifts:
 *   post:
 *     summary: Отправить подарок
 *     tags: [Gifts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ID получателя и игры
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [toId, gameId]
 *             properties:
 *               toId:
 *                 type: integer
 *               gameId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Подарок создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gift'
 */
router.post('/', auth, sendGift);

/**
 * @swagger
 * /api/gifts/{id}/accept:
 *   put:
 *     summary: Принять подарок
 *     tags: [Gifts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Подарок принят
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gift'
 */
router.put('/:id/accept', auth, accept);

/**
 * @swagger
 * /api/gifts/{id}/reject:
 *   put:
 *     summary: Отклонить подарок
 *     tags: [Gifts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Подарок отклонён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gift'
 */
router.put('/:id/reject', auth, reject);

module.exports = router;
