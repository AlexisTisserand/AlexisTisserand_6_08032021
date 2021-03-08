const multer = require('multer')

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
}

const storage = multer.diskStorage({
    //dans quel dossier enregistrer les fichiers
    destination: (req, file, callback) => { 
        callback(null, 'images')
    },
    //quel nom de fichier utiliser
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // partie avant l'extension et supprimer les espaces
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //génération du nom unique du fichier envoyé
    }
});

module.exports = multer({storage}).single('image')