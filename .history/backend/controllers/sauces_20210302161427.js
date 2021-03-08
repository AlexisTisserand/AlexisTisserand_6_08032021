//Prendre la logique métier appliquée à chaque route et la stocker ici
//On récupère le modèle sauce qu'on a crée dans "Models"
const Sauce = require('../models/Sauce')
// Récupération du module 'file system' de Node qui permet de gérer les téléchargements et les modifications d'images
const fs = require('fs')

//CRÉATION NOUVELLE SAUCE
exports.createSauce = (req, res, next) => {
  //On stocke dans une variable les données envoyées par le frontend en les transformant en objet js sous forme de chaine de caractères
  const sauceObject = JSON.parse(req.body.sauce);
  //Suppression de l'id généré automatiquement par le front end; l'id de la sauce est créée par MongoDB lorsque la sauce est envoyée dans la BDD
  delete sauceObject._id;
  //Création instance d'une nouvelle sauce
  const sauce = new Sauce({
    ...sauceObject,
    //Récupération de l'URL de l'image : req.protocol = http par exemple 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  //Sauvegarde la sauce dans la base de données
  sauce.save()
  //Envoi au frontend de la réponse
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }))
};


//Fonction qui permet de liker ou disliker une sauce
exports.likeOrDislikeSauce = (req, res, next) => {
  const like = req.body.like
  const userId = req.body.userId
  const sauceId = req.params.id

  if (like === 1) {
    Sauce.updateOne({
      _id: sauceId
    })
  } 
}

//MODIFICATION SAUCE
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? // opérateur ternaire pour savoir si req.file existe ou non
  {
    //si le fichier image existe déjà
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : {
    //si le fichier image n'existe pas on fait comme une route POST
    ...req.body
  }; 
  //On applique ensuite les paramètres de sauceObject
  Sauce.updateOne({
    _id: req.params.id
  },  {
    ...sauceObject, 
    _id: req.params.id
  })
  .then(() => res.status(200).json({message: "Sauce modifiée !"}))
  .catch(error => res.status(400).json({error}))
};

//SUPPRIMER SAUCE
exports.deleteSauce = (req, res, next) => {
  //Avant de supprimer l'objet de la base on le cherche pour obtenir l'Url de l'image (on aura donc accès au nom du fichier) et on pourra le supprimer ensuite
  Sauce.findOne({
    _id: req.params.id
  }) // trouver celui qui a l'id qui correspond a celui dans les paramètres de la requête
  .then(sauce => {
    //récupérer le nom du fichier précisement
    const filename = sauce.imageUrl.split('/images/')[1]; // retourne un tableau avant et après /images/ [1] correspond au nom du fichier
    //unlink permet de supprimer un fichier avec comme deuxième argument un callback (que fait on une fois le fichier supprimé ?)
    fs.unlink(`images/${filename}`, () => { 
      Sauce.deleteOne({
        _id: req.params.id
      })
      .then(() => res.status(200).json({message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({error}))
    }) 
  })
  .catch(error => res.status(500).json({error}));
};

//RECUPERER UNE SEULE SAUCE avec un id donnée par la BDD MongoDB
exports.getOneSauce = (req, res, next) => {
  //Méthode findOne() : on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de la requête
  Sauce.findOne({
    _id: req.params.id
  })
  //Si ok : on retourne une réponse et on affiche l'objet
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
};

//RECUPERER TOUTES LES SAUCES DE LA BDD MONGODB
exports.getAllSauces = (req, res, next) => {
  //méthode find() : permet d'obtenir la liste complète sous format array des sauces trouvées dans la BDD
  Sauce.find()
  //Si ok : renvoie un tableau de toutes les données
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
};

