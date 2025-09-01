const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/notifications.controller');

router.get('/my', auth, ctrl.my);
router.post('/', auth, ctrl.create);
router.post('/:id/read', auth, ctrl.read);

module.exports = router;
