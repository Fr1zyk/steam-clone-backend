
const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
    try {
        // req.user.id проставляется в auth.middleware
        const user = await User.findByPk(req.user.id, {
            attributes: ['id','email','nickname','createdAt']
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { nickname } = req.body;
        if (!nickname) return res.status(400).json({ error: 'Nickname required' });

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.nickname = nickname;
        await user.save();

        res.json({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        next(err);
    }
};
