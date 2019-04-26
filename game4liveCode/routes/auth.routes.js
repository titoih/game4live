const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/register', authController.showRegister);
router.post('/register', authController.doRegister);


router.get('/login', authController.showLogin);
router.post('/login', authController.doLogin)


module.exports = router;