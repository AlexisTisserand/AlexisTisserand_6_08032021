const express = require('express')
const router = express.Router() //crée un router avec la méthode Router() d'express

const sauceCtrl =  require('../controllers/sauces')

router.post('/', sauceCtrl.createSauce)

router.put('/:id', sauceCtrl.modifySauce)

router.delete('/:id', (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}))
})

router.get('/:id', (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
})

router.get('/', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
})

module.exports = router;
