// routes/friend.routes.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {
    list,
    add,
    remove
} = require('../controllers/friend.controller');

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Друзья/подписки
 */

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Список друзей
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив друзей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', auth, list);

/**
 * @swagger
 * /api/friends:
 *   post:
 *     summary: Добавить друга
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: ID пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [friendId]
 *             properties:
 *               friendId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Друзья добавлены
 *       400:
 *         description: Некорректный запрос
 */
router.post('/', auth, add);

/**
 * @swagger
 * /api/friends/{id}:
 *   delete:
 *     summary: Удалить друга
 *     tags: [Friends]
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
 *         description: Успешно удалено
 *       404:
 *         description: Не найдено
 */
router.delete('/:id', auth, remove);

module.exports = router;
