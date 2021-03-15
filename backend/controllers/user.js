// Importation du modèle User crée avec la méthode schema de mongoose
const User = require('../models/User');
// Utilisation de l'algorithme bcrypt pour hasher le mot de passe des users
const bcrypt = require('bcrypt');
// Package jsonwebtoken pour attribuer un token à l'utilisateur quand il se connectera
const jwt = require('jsonwebtoken');

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  //Crypter le mot de passe
  bcrypt.hash(req.body.password, 10) //mdp du corps de la requête
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save() //Enregistre le nouvel utilisateur dans la base de données
        .then(() => res.status(201).json({message: "Utilisateur crée !"}))
        .catch(error => res.status(400).json({error})) // Renvoie une erreur s'il existe un utilisateur avec la même adresse mail
    })
    .catch(error => res.status(500).json({error}))
};

//Vérifie si l'utilisateur existe dans la base de données MongoDB lors du login
//Si utilisateur existe alors le middleware renvoie un token qui contient l'id utilisateur
exports.login = (req, res, next) => {
  User.findOne({ //On cherche l'utilisateur dans la BDD qui correspond à l'adresse du user
    email: req.body.email
  }) 
  .then(user => {
    if(!user) {
      return res.status(401).json({message: "Utilisateur non trouvé !"}) //Si utilisateur n'existe pas alors erreur 401
    }
    bcrypt.compare(req.body.password, user.password) //S'il existe, on utilise bcrypt pour comparer les deux hash et vérifier s'ils ont la même chaine de caractère d'origine
    .then(valid => {
      if(!valid) { //Si non valide alors l'utilisateur ou le mdp est incorrect
        return res.status(401).json({message: "Mot de passe incorrect ou utilisateur incorrect !"})
      }
      //Si valide, alors on renvoie un statut 200 + objet JSON avec userID + token
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id},
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h'}
        )
      });
    })
    .catch(error => res.status(500).json({error}))
  })
  .catch(error => res.status(500).json({error}))
};
