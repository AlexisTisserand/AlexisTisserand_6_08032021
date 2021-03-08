//app.js gère TOUTES LES REQUÊTES envoyées à notre serveur

//importation d'express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const nocache = require('nocache');
require('dotenv').config();

/*
**IMPORT ROUTES**
*/

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//création de l'application express
const app = express();

//Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //Limite chaque adresse IP à 100 requête par windowMs
})


mongoose.connect(process.env.DB_URI,
{   
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    //ressources qui peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    //autorise ce serveur à fournir des scripts pour la page visitée
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

/*
**GLOBAL MIDDLEWARES**
*/

//A middleware to parse incoming request inputs into our req.body object
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());
app.disable('x-powered-by');

//création d'un middleware qui va répondre aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images'))); //__dirname qui est le nom du dossier dans le quel on est

//Applique express-rate-limite à toutes les requêtes
app.use(limiter)

//Désactive la mise en cache du navigateur
app.use(nocache());

/*
**ROUTES**
*/
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


//exportation de l'application express
module.exports = app;
