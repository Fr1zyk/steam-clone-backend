// routes/profile.routes.js
const { Router } = require('express');
const auth       = require('../middleware/auth.middleware');
const multer     = require('multer');
const upload     = multer({ dest: 'uploads/' });
const {
    getProfile,
    updateProfile,
    getPurchaseHistory,
    getFriends
} = require('../controllers/profile.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Работа с профилем пользователя
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Получить профиль текущего пользователя
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Объект пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/', auth, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Обновить nickname и/или аватар
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
 *               $ref: '#/components/schemas/User'
 */
router.put('/', auth, upload.single('avatar'), updateProfile);

/**
 * @swagger
 * /api/profile/purchases:
 *   get:
 *     summary: Получить историю покупок пользователя
 *     tags: [Profile]
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
router.get('/purchases', auth, getPurchaseHistory);

/**
 * @swagger
 * /api/profile/friends:
 *   get:
 *     summary: Список друзей пользователя
 *     tags: [Profile]
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
router.get('/friends', auth, getFriends);

module.exports = router;
