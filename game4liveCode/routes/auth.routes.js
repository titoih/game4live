const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');


router.get('/register', authController.showRegister);
router.post('/register', authController.doRegister);


router.get('/login', authController.showLogin);
router.post('/login', authController.doLogin);

router.get('/auth/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google-auth', {
failureRedirect: '/',
successRedirect: '/player'
}));

module.exports = router;