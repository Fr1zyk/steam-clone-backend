// routes/wishlist.routes.js
const router = require('express').Router();
const auth   = require('../middleware/auth.middleware');
const {
    getMyWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlist.controller');

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
 *     summary: Список желаемого
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив элементов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wishlist'
 */
router.get('/', auth, getMyWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Добавить игру в Wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistInput'
 *     responses:
 *       201:
 *         description: Элемент добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 */
router.post('/', auth, addToWishlist);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Удалить элемент из Wishlist
 *     tags: [Wishlist]
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
 *         description: Элемент удалён
 */
router.delete('/:id', auth, removeFromWishlist);

module.exports = router;
