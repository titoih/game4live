const Player = require('../models/player.model');

module.exports.account = (req, res, next) => {
  
  Player.findOne({email:req.user.email})
    .then(player => {
      res.render('player/account', { player })
    })
    .catch(error => next(error));
}
