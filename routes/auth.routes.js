
const router = require('express').Router();
const { register, login, validateAuth } = require('../controllers/auth.controller');

router.post('/register', validateAuth('register'), register);
router.post('/login',    validateAuth('login'),    login);

module.exports = router;
