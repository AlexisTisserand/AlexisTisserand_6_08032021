const express = require('express');
const router = express.Router(); //crée un router avec la méthode Router() d'express 

const Sauce = require('../models/Sauce');

router.get('/', (req, res, next) => {
    Sauce.find()
    .then((sauces => res.status(200).json(sauces)))
    .catch(error => res.status(400).json({error}));
})

module.exports = router;