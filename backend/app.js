//app.js gère TOUTES LES REQUÊTES envoyées à notre serveur

//importation de différents plugins
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const nocache = require('nocache');
require('dotenv').config();
const rateLimit = require('express-rate-limit')

/*
**IMPORT ROUTES**
*/
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//création de l'application express
const app = express();

//middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
const mongoSanitize = require('express-mongo-sanitize')

//Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
mongoose.connect(process.env.DB_URI,
{   
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requêtes depuis son navigateur
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

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); 

//A middleware to parse incoming request inputs into our req.body object
// On utilise une méthode body-parser pour la transformation du corps de la requête en JSON, en objet JS utilisable
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());
app.disable('x-powered-by');

//Désactive la mise en cache du navigateur
app.use(nocache());

//création d'un middleware qui va répondre aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images'))); //__dirname qui est le nom du dossier dans le quel on est


/*
**ROUTES**
*/

// Routes pour la gestion de toute les ressources de l'API attendues - Routage
// Middleware qui va transmettre les requêtes vers ces url vers les routes correspondantes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


//exportation de l'application express
module.exports = app;
