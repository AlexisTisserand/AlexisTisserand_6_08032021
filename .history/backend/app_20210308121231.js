//app.js gère TOUTES LES REQUÊTES envoyées à notre serveur

//importation d'express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //Limite chaque adresse IP à 100 requête par windowMs
})

//importation d'helmet
const helmet = require('helmet');

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

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//exportation de l'application express
module.exports = app;
