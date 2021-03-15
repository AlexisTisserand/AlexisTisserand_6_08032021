const express = require('express')
const router = express.Router() //crée un router avec la méthode Router() d'express

const sauceCtrl =  require('../controllers/sauces'); //Importation du controller
const auth = require('../middleware/auth'); //Récupère la configuration d'identification Jsonwebtoken
const multer = require('../middleware/multer-config'); //Middleware de gestion d'images

router.post('/', auth, multer, sauceCtrl.createSauce); //bien mettre multer après le middleware d'authentification
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth,  sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce)

module.exports = router;
