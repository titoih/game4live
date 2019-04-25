const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/register', authController.showRegister);

router.get('/login', authController.showLogin);


module.exports = router;