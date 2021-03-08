const express = require('express')
const router = express.Router() //crée un router avec la méthode Router() d'express

const Sauce = require('../models/Sauce')

router.post('/', (req, res, next) => {
  const sauce = new Sauce({
    ...req.body
  })
  sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}));
});

router.put('/:id', (req, res, next) => {
  Sauce.updateOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Objet modifié !"}))
    .catch(error => res.status(400).json({error}))
})

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
