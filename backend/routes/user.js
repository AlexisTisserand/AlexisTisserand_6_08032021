//Contient les fonctions qui vont s'appliquer aux différentes routes pour les utilisateurs

const express = require('express'); //Routes nécessite express
const router = express.Router(); //création d'un router avec la méthode mise à disposition par Express
const userCtrl = require('../controllers/user') //Association des fonctions aux différentes routes et on importe le controller
const verifyPassword = require('../middleware/verify-password')

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;