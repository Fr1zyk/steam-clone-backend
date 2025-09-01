const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/friends.controller');

router.get('/my', auth, ctrl.my);
router.post('/:userId', auth, ctrl.follow);
router.delete('/:userId', auth, ctrl.unfollow);

module.exports = router;
