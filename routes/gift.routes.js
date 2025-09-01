const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/gifts.controller');

router.get('/my', auth, ctrl.my);
router.post('/', auth, ctrl.send);

module.exports = router;
