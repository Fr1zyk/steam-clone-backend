// routes/profile.routes.js
const Router = require('express').Router;
const {
    getProfile,
    updateProfile,
    getPurchaseHistory,
    getFriends
} = require('../controllers/profile.controller');
const auth = require('../middleware/auth.middleware');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Работа с профилем пользователя
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         nickname:
 *           type: string
 *         avatarUrl:
 *           type: string
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Получить свой профиль
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Инфо о профиле
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
router.get('/', auth, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Обновить свой профиль
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Обновлённый профиль
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
router.put('/', auth, updateProfile);

/**
 * @swagger
 * /api/profile/purchases:
 *   get:
 *     summary: История покупок
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список покупок
 */
router.get('/purchases', auth, getPurchaseHistory);

/**
 * @swagger
 * /api/profile/friends:
 *   get:
 *     summary: Список друзей
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив друзей
 */
router.get('/friends', auth, getFriends);

module.exports = router;
