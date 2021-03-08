//Prendre la logique métier appliquée à chaque route et la stocker ici

const Sauce = require('../models/Sauce')

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.thing);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject
  })
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }))
};

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Objet modifié !"}))
    .catch(error => res.status(400).json({error}))
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}))
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
};
