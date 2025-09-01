const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reviews.controller');

router.get('/game/:gameId', ctrl.forGame);
router.post('/', auth, ctrl.create);

module.exports = router;
