const express = require('express');
const router = express.Router();
const secure = require('../middelwares/secure.mid');
const playerController = require('../controllers/player.controller');

router.get('/', secure.isAuthenticated, playerController.account);

module.exports = router;