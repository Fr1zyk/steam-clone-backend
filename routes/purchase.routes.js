const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/purchases.controller');

router.post('/', auth, ctrl.buy);
router.get('/my', auth, ctrl.my);

module.exports = router;
