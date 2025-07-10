const { Notification } = require('../models');

/**
 * GET /api/notifications
 */
exports.list = async (req, res, next) => {
    try {
        const notes = await Notification.findAll({
            where: { userId: req.user.id },
            order: [['createdAt','DESC']]
        });
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/notifications/:id/read
 */
exports.markRead = async (req, res, next) => {
    try {
        const n = await Notification.findByPk(req.params.id);
        n.read = true; await n.save();
        res.json(n);
    } catch (err) {
        next(err);
    }
};
