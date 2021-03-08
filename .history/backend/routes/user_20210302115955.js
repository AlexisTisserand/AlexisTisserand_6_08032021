const express = require('express'); //Routes nécessite express
const router = express.Router(); //création d'un router avec express
const userCtrl = require('../controllers/user') //Association des fonctions aux difféetnes routes et on importe le controller

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;