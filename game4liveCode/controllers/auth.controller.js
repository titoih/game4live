const mongoose = require('mongoose');
const Player = require('../models/player.model');
const passport = require('passport');

module.exports.showRegister = (req, res, next) => {
  res.render('auth/register');
}

module.exports.showLogin = (req, res, next) => {
  res.render('auth/login');
}