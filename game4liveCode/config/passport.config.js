
const Player = require('../models/player.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

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
}));

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, authenticateOAuthUser));

function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
  const provider = `${profile.provider}Id`;
  const socialId = profile.id;
  const name = profile.displayName;
  const email = profile.emails ? profile.emails[0].value : undefined;
  const avatarURL = profile.picture || profile.photos && profile.photos[0].value;
  Player.findOne({
     $or: [
       { email: email },
       { [`social.${provider}`]: socialId }
     ]
   })
     .then(player => {
       if (player) {
         next(null, player);
        } else if (!player) {
          player = new Player({
            name: name,
            email: email,
            password: Math.random().toString(35), // Be carefully only for dev purposes, Math.random seed is predictable!!
            social: {
              [provider]: socialId
            },
            avatarURL: avatarURL
          })
          return player.save()
            .then(player => next(null, player))
        }
      })
      .catch(error => next(error))
  }