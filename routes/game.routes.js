// routes/game.routes.js
const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/game.controller');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: CRUD для игр
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Список всех игр
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Массив объектов игр
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get('/', getAllGames);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Получить игру по ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Объект игры
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Игра не найдена
 */
router.get('/:id', getGameById);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Создать новую игру
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Данные новой игры
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameCreate'
 *     responses:
 *       201:
 *         description: Игра создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       401:
 *         description: Неавторизован
 */
router.post('/', auth, createGame);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Обновить данные игры
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Поля для обновления
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameUpdate'
 *     responses:
 *       200:
 *         description: Обновлённый объект игры
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Игра не найдена
 */
router.put('/:id', auth, updateGame);

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Удалить игру
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Успешное удаление
 *       404:
 *         description: Игра не найдена
 */
router.delete('/:id', auth, deleteGame);

module.exports = router;
