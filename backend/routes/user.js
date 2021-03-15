//Contient les fonctions qui vont s'appliquer aux différentes routes pour les utilisateurs

const express = require('express'); //Routes nécessite express
const router = express.Router(); //création d'un router avec la méthode mise à disposition par Express
const userCtrl = require('../controllers/user') //Association des fonctions aux différentes routes et on importe le controller
const verifyPassword = require('../middleware/verify-password')
const rateLimiter = require('../middleware/rate-limit')

router.post('/signup', rateLimiter, verifyPassword, userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);

module.exports = router;