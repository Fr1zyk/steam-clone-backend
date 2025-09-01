const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/register', ctrl.validateRegister, ctrl.register);
router.post('/login', ctrl.validateLogin, ctrl.login);

module.exports = router;
