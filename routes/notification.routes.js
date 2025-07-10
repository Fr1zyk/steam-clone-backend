// routes/notification.routes.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {
    list,
    markRead
} = require('../controllers/notification.controller');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Уведомления
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Получить уведомления пользователя
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список уведомлений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get('/', auth, list);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Отметить уведомление прочитанным
 *     tags: [Notifications]
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
 *         description: Уведомление отмечено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */
router.put('/:id/read', auth, markRead);

module.exports = router;
