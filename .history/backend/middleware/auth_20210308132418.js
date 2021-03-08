const jwt = require('jsonwebtoken'); //package jsonwebtoken pour vérifier les tokens

module.exports = (req, res, next) => {
  try {
    //récupérer l'identifiant après Bearer
    const token = req.headers.authorization.split(' ')[1]; 
    //vérification du token avec verify()
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //RANDOM_TOKEN_SECRET doit correspondre à celui de login
    const userId = decodedToken.userId;
    //Vérifier si jamais il y a un userId avec la requête et vérifier si elle correspond bien avec celle du token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else { //si on est au else c'est que tout est ok et on appelle le middleware suivant 
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'});
  }
}
