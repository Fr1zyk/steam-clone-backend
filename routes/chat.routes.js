// routes/chat.routes.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {
    get,
    send
} = require('../controllers/chat.controller');

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Сообщения
 */

/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Получить сообщения между пользователями
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: with
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список сообщений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 */
router.get('/', auth, get);

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Отправить сообщение
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ID получателя и текст
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [toId, message]
 *             properties:
 *               toId:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Сообщение отправлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 */
router.post('/', auth, send);

module.exports = router;
