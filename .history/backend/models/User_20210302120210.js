const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
})

//Plugin qui permet de garantir un email unique par utilisateur
userSchema.plugin(uniqueValidator)

//Exportation du schéma sous forme de modèle, appelé User
module.exports = mongoose.model('User', userSchema)
