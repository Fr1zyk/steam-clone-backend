const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/profile.controller');

router.get('/me', auth, ctrl.me);

module.exports = router;
