const mongoose = require('mongoose');
require('mongoose-type-email')

const uniqueValidator = require('mongoose-unique-validator')
const sanitizerPlugin = require('mongoose-sanitizer-plugin')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//Plugin qui permet de garantir un email unique par utilisateur
userSchema.plugin(uniqueValidator)

//plugin qui purifie les champs du model avant de les enregistrer dans la base MongoDB
userSchema.plugin(sanitizerPlugin)

//Exportation du schéma sous forme de modèle, appelé User
module.exports = mongoose.model('User', userSchema)
