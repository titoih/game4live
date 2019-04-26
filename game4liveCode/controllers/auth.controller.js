const mongoose = require('mongoose');
const Player = require('../models/player.model');
const passport = require('passport');

module.exports.showRegister = (req, res, next) => {
  res.render('auth/register');
}

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      player: req.body,
      errors: errors
    })
  }

  Player.findOne({email:req.body.email}) 
    .then(player => {
      if (player) {
        renderWithErrors({email: 'Email already in use'})
      } else {
        player = new Player (req.body);
        return player.save()
          .then(player => res.redirect('/login'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    });
}

module.exports.showLogin = (req, res, next) => {
  res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, player, validation) => {
    if(error) {
      next(error);
    } else if (!player) {
      res.render('auth/register', {
        player: req.body,
        errors: validation
      })
    } else {
      return req.login(player, (error) => {
        if(error) {
          next(error)
        } else {
          res.redirect('/player')
        }
      })
    }
  })(req, res, next);
}