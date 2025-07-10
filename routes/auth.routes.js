const Router = require('express').Router;
const { register, login } = require('../controllers/auth.controller');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Регистрация и авторизация пользователей
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - nickname
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Почта пользователя
 *         password:
 *           type: string
 *           description: Пароль (минимум 6 символов)
 *         nickname:
 *           type: string
 *           description: Никнейм пользователя
 *       example:
 *         email: test@example.com
 *         password: 123456
 *         nickname: tester
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT-токен для доступа к защищённым маршрутам
 *       example:
 *         token: eyJhbGciO...
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       description: Данные для создания учётки
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: test@example.com
 *                 nickname:
 *                   type: string
 *                   example: tester
 *       400:
 *         description: Неверные данные
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Логин и получение токена
 *     tags: [Auth]
 *     requestBody:
 *       description: Данные для аутентификации
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               email: test@example.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Неверные учётные данные
 */

router.post('/register', register);
router.post('/login',    login);

module.exports = router;