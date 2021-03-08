const express = require('express')
const router = express.Router() //crée un router avec la méthode Router() d'express

const sauceCtrl =  require('../controllers/sauces')

router.post('/', sauceCtrl.createSauce)

router.put('/:id', sauceCtrl.modifySauce)

router.delete('/:id', sauceCtrl.deleteSauce)

router.get('/:id', sauceCtrl.getOneSauce)

router.get('/', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
})

module.exports = router;
