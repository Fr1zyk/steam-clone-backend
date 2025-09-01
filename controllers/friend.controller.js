const { Friend, User } = require('../models');

exports.follow = async (req, res) => {
    const { userId } = req.params;
    if (+userId === req.user.id) return res.status(400).json({ message: 'Cannot follow self' });
    const target = await User.findByPk(userId);
    if (!target) return res.status(404).json({ message: 'User not found' });
    const exists = await Friend.findOne({ where: { userId: req.user.id, friendId: userId } });
    if (exists) return res.json(exists);
    const f = await Friend.create({ userId: req.user.id, friendId: userId });
    res.status(201).json(f);
};

exports.unfollow = async (req, res) => {
    const { userId } = req.params;
    const f = await Friend.findOne({ where: { userId: req.user.id, friendId: userId } });
    if (!f) return res.status(404).json({ message: 'Not found' });
    await f.destroy();
    res.json({ ok: true });
};

exports.my = async (req, res) => {
    const following = await Friend.findAll({ where: { userId: req.user.id } });
    res.json(following);
};
