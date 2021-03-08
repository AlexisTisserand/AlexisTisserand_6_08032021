const express = require('express'); //Routes nécessite express
const router = express.Router(); //création d'un router avec express
const userCtrl = require('../controllers/user') //Association des fonctions aux difféetnes routes et on importe le controller
const verifyPassword = require('../middleware/verify-password')

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;