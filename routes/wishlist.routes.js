const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/wishlist.controller');

router.get('/my', auth, ctrl.my);
router.post('/:gameId', auth, ctrl.add);
router.delete('/:gameId', auth, ctrl.remove);

module.exports = router;
