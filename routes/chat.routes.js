const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/chat.controller');

router.get('/inbox', auth, ctrl.inbox);
router.get('/sent', auth, ctrl.sent);
router.post('/', auth, ctrl.send);

module.exports = router;
