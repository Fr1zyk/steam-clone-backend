const { User } = require('../models');

exports.me = async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ['id','email','nickname','avatarUrl','isVerified'] });
    if (!user) return res.status(404).json({ message: 'Not found' });
    return res.json(user);
};
