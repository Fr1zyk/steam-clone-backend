// routes/game.routes.js
const Router = require('express').Router;
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/game.controller');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Операции с играми
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         developer:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Получить список всех игр
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Массив игр
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
 *         description: ID игры
 *     responses:
 *       200:
 *         description: Одна игра
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Не найдена
 */
router.get('/:id', getGameById);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Создать новую игру
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - developer
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               developer:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Игра создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
router.post('/', createGame);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Обновить игру
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID игры
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Обновлённая игра
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
router.put('/:id', updateGame);

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Удалить игру
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID игры
 *     responses:
 *       204:
 *         description: Успешно удалено
 */
router.delete('/:id', deleteGame);

module.exports = router;
