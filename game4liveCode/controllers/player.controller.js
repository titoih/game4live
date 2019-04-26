const Player = require('../models/player.model');

module.exports.account = (req, res, next) => {
  
  Player.find({email:req.user.email})
    .then(player => {
      res.render('player/account', { player })
    })
    .catch(error => next(error));
}
