const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    userId: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

userSchema.plugin(uniqueValidator); //Aucun utilisateur ne pourra avoir le même id et la même adresse mail

module.exports = mongoose.model('User', userSchema)