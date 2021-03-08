const multer = require('multer') // importation de multer

//Dictionnaire qui recense les différentes extensions que peut envoyer le frontend
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Création d'un objet de configuration pour multer
const storage = multer.diskStorage({ //diskStorage permet de dire qu'on enregistre sur le disque qui prend deux éléments (destination et filename)
    // DESTINATION : dans quel dossier enregistrer les fichiers
    destination: (req, file, callback) => { 
        callback(null, 'images')
    },
    //FILENAME : quel nom de fichier utiliser
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // partie avant l'extension et supprimer les espaces
        const extension = MIME_TYPES[file.mimetype]; //création de l'extension du fichier
        callback(null, Date.now() + '.' + extension); //génération du nom unique du fichier envoyé
    }
});

module.exports = multer({storage}).single('image') //méthode single dit que le fichier est unique