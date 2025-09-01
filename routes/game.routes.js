const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/games.controller');

// public
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

// admin (simplified: protect with auth; add role checks later)
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
