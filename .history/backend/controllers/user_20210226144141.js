const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signup = (req, res, next) => {
  //Crypter le mot de passe
  bcrypt.hash(req.body.password, 10) //mdp du corps de la requête
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(200).json({message: "Utilisateur crée !"}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}) )
}

exports.login = (req, res, next) => {}
