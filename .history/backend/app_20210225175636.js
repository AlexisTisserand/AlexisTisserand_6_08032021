const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Sauce = require('./models/Sauce');
mongoose.connect('mongodb+srv://Alexis:Mi2LdxD2CYRKkDfC@clusteroc.ldrlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const Sauce = require('./models/Utilisateur');
mongoose.connect('mongodb+srv://Alexis:Mi2LdxD2CYRKkDfC@clusteroc.ldrlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

module.exports = app;
