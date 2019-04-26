const Player = require('../models/player.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((player, next) => {
  next(null, player.id);
})

passport.deserializeUser((id, next) => {
  Player.findById(id)
    .then(player => next(null, player))
    .catch(next)
})

passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  Player.findOne({email: email})
    .then(player => {
      if(!player) {
        next(null, null, {email: 'Invalid data'})
      } else {
        return player.checkPassword(password)
          .then(match => {
            if(!match) {
              next(null, null, {password:'Invalid data'})
            } else {
              next(null, player);
            }
          })
      }
    })
}))