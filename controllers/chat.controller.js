const { Chat, User } = require('../models');

exports.send = async (req, res) => {
    const { toId, message } = req.body;
    if (!toId || !message) return res.status(400).json({ message: 'toId and message required' });
    const to = await User.findByPk(toId);
    if (!to) return res.status(404).json({ message: 'Recipient not found' });
    const m = await Chat.create({ fromId: req.user.id, toId, message });
    res.status(201).json(m);
};

exports.inbox = async (req, res) => {
    const msgs = await Chat.findAll({ where: { toId: req.user.id } });
    res.json(msgs);
};

exports.sent = async (req, res) => {
    const msgs = await Chat.findAll({ where: { fromId: req.user.id } });
    res.json(msgs);
};
