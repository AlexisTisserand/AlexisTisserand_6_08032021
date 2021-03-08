//Ecoute des requêtes http et reponse
const http = require('http'); // Import du package http - https requiert un certificat SSL à obtenir avec un nom de domaine
const app = require('./app') // Import de app pour utilisation de l'application sur le serveurÉ

//normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'une numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  //Ajout du port de connection si celui-ci n'est pas déclaré par l'environnement. si aucun port n'est fourni on écoutera sur le port 3000
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  //errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur.
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  //création d'un serveur avec express qui utilise app
  const server = http.createServer(app);
  
  //Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
  server.on('error', errorHandler);
  
  //Ecouteur d'événements qui enregistre le port nommé sur lequel le serveur s'exécute dans la console
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  //Le serveur écoute le port défini
  server.listen(port);
  