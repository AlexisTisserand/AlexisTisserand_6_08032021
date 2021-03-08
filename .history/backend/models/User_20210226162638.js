const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

//Plugin qui permet de garantir un email unique par utilisateur
userSchema.plugin(uniqueValidator); 

//Exportation du schéma sous forme de modèle, appelé User
module.exports = mongoose.model('User', userSchema)