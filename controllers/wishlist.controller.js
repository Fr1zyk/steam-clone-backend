const Wishlist = require('../models/Wishlist');
const Game     = require('../models/Game');

exports.getMyWishlist = async (req, res, next) => {
    try {
        const items = await Wishlist.findAll({
            where: { userId: req.user.id },
            include: [{ model: Game, attributes: ['id','title','price','developer'] }],
            order: [['createdAt','DESC']]
        });
        res.json(items);
    } catch (err) {
        next(err);
    }
};

exports.addToWishlist = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        if (!gameId) return res.status(400).json({ error: 'gameId required' });

        // не дублируем
        const exists = await Wishlist.findOne({
            where: { userId: req.user.id, gameId }
        });
        if (exists) return res.status(409).json({ error: 'Already in wishlist' });

        const entry = await Wishlist.create({
            userId: req.user.id,
            gameId
        });
        res.status(201).json(entry);
    } catch (err) {
        next(err);
    }
};

exports.removeFromWishlist = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const entry = await Wishlist.findByPk(id);
        if (!entry || entry.userId !== req.user.id) {
            return res.status(404).json({ error: 'Wishlist item not found' });
        }
        await entry.destroy();
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
