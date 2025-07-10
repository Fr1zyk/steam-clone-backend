// routes/wishlist.routes.js
const Router = require('express').Router;
const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require('../controllers/wishlist.controller');
const auth = require('../middleware/auth.middleware');

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Список желаемого
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Получить свой список желаемого
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив игр в списке желаемого
 */
router.get('/', auth, getWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Добавить игру в список желаемого
 *     tags: [Wishlist]
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
 *         description: Добавлено
 */
router.post('/', auth, addToWishlist);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Убрать игру из списка желаемого
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи в списке желаемого
 *     responses:
 *       204:
 *         description: Удалено
 */
router.delete('/:id', auth, removeFromWishlist);

module.exports = router;
