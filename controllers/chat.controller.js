const { Chat } = require('../models');

/**
 * GET /api/chat?with=USER_ID
 */
exports.get = async (req, res, next) => {
    try {
        const withId = parseInt(req.query.with);
        const msgs = await Chat.findAll({
            where: {
                fromId: [req.user.id, withId],
                toId:   [req.user.id, withId]
            },
            order: [['createdAt','ASC']]
        });
        res.json(msgs);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/chat
 */
exports.send = async (req, res, next) => {
    try {
        const { toId, message } = req.body;
        const m = await Chat.create({ fromId: req.user.id, toId, message });
        res.status(201).json(m);
    } catch (err) {
        next(err);
    }
};
