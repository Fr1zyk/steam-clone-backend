const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const gameCtrl = require('../controllers/game.controller');

router.get('/', auth, gameCtrl.getAll);
router.get('/:id', auth, gameCtrl.getById);
router.post('/', auth, admin, gameCtrl.create);
router.put('/:id', auth, admin, gameCtrl.update);
router.delete('/:id', auth, admin, gameCtrl.remove);

module.exports = router;
