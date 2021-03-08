const express = require('express'); //Routes nécessite express
const router = express.Router(); //création d'un router avec express
const userCtrl = require('../controllers/user') //Association des fonctions aux difféetnes routes et on importe le controller
const auth = require('../middleware/auth')

router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);

module.exports = router;