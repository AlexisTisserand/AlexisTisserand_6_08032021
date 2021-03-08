const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signup = (req, res, next) => {
  //Crypter le mot de passe
  bcrypt.hash(req.body.password, 10) //mdp du corps de la requête
    .then(hash => {
      const user = new User
    })
    .catch(error => res.status(500).json({error}) )
}

exports.login = (req, res, next) => {}
