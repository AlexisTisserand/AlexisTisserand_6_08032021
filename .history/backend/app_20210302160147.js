//app.js gère TOUTES LES REQUÊTES envoyées à notre serveur

//importation d'express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//création de l'application express
const app = express();

mongoose.connect('mongodb+srv://Alexis:Mi2LdxD2CYRKkDfC@clusteroc.ldrlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{   
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

app.use(bodyParser.json());

//création d'un middleware qui va répondre aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images'))); //__dirname qui est le nom du dossier dans le quel on est

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

//exportation de l'application express
module.exports = app;
