const { Notification } = require('../models');

exports.my = async (req, res) => {
    const list = await Notification.findAll({ where: { userId: req.user.id } });
    res.json(list);
};

exports.create = async (req, res) => {
    const { userId, text } = req.body;
    const n = await Notification.create({ userId, text });
    res.status(201).json(n);
};

exports.read = async (req, res) => {
    const { id } = req.params;
    const n = await Notification.findByPk(id);
    if (!n || n.userId !== req.user.id) return res.status(404).json({ message: 'Not found' });
    await n.update({ read: true });
    res.json(n);
};
