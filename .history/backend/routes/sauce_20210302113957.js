const express = require('express')
const router = express.Router() //crée un router avec la méthode Router() d'express

const sauceCtrl =  require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, sauceCtrl.createSauce)
router.put('/:id', sauceCtrl.modifySauce)
router.delete('/:id', sauceCtrl.deleteSauce)
router.get('/:id', sauceCtrl.getOneSauce)
router.get('/', sauceCtrl.getAllSauces)

module.exports = router;
