
const Purchase = require('../models/Purchase');
const Game     = require('../models/Game');

exports.getMyPurchases = async (req, res, next) => {
    try {
        const list = await Purchase.findAll({
            where: { userId: req.user.id },
            include: [{ model: Game, attributes: ['id','title','price'] }]
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

exports.buyGame = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        if (!gameId) return res.status(400).json({ error: 'gameId required' });

        // Проверяем, что такой purchase ещё нет
        const exists = await Purchase.findOne({
            where: { userId: req.user.id, gameId }
        });
        if (exists) return res.status(409).json({ error: 'Already purchased' });

        const purchase = await Purchase.create({
            userId: req.user.id,
            gameId
        });
        res.status(201).json(purchase);
    } catch (err) {
        next(err);
    }
};
