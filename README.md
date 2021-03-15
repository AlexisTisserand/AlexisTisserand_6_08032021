# 🌶️ So Pekocko

Sixième projet du parcours "Développeur Web" proposé par OpenClassrooms. <br>
L'objectif de ce projet était de **construire une API sécurisé pour l'application d'avis gastronomiques So Pekocko**.

Plus précisément, il était demandé de mettre en place un premier MVP d'une application web dans laquelle les utilisateurs inscrits pourront **ajouter leurs sauces préféréees** et **liker ou disliker** les sauces proposées par les autres.

Vous trouverez le [brief complet ici](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf) 👀

## :computer: CONTEXTE DU PROJET

- So Pekocko est une entreprise familiale de 10 salariés. 
- Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. 
- Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

## 🎓 OBJECTIFS & COMPÉTENCES ÉVALUÉES

***L'objectif de ce projet était de créer le backend de l'application, le frontend étant déjà codé et fourni dans ce [repository](https://github.com/OpenClassrooms-Student-Center/dwj-projet6)***

Ce repository contient les deux dossiers `frontend` et `backend`

#### Compétences évaluées 
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

#### Réalisation de l'API
L’entreprise ayant subi quelques attaques sur son site web ces dernières semaines, pour ce projet les données des utilisateurs doivent être parfaitement protégées. Plusieurs exigeances : 
- API doit respecter le RGPD et les standards OWASP ✅ 
- le mot de passe utilisateur doit être chiffré ✅
- l'authentification est renforcée sur les routes requises ✅ 
- les adresses mails de la base de données sont uniques ✅

## 🔨 INSTALLATION

* Cloner ce repository depuis Github

 #### 💡 Frontend
 - Ouvrir le terminal dans le dossier frontend et exécuter `npm install`
 - Installer sass : `npm install node-sass`
 - Accéder au serveur de développement avec `ng serve` ou `npm start`
 - Rendez-vous à l'adresse suivante : [http://localhost:4200](http://localhost:4200)

#### 💡 Backend
- Avant toute chose, vous devez créer un fichier `.env` dans le backend du projet et y renseigner dans une constante `DB_URI` votre adresse SRV MongoDB de la forme suivante : `DB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@clusteroc.ldrlw.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority"`
- Ensuite dans le même dossier `.env` , créer une constante `JWT_TOKEN` où vous inscrirez une chaîne de caractère complexe. Exemple : `JWT_TOKEN="&àçZSKLMDJGPZôlpsqkafapPKAPEFGOJPGd9876549"`
- Ouvrir le terminal dans le dossier backend et installer le package nodemon : `npm install --save nodemon`
- Enfin, lancez le serveur avec `nodemon server`

#### 👤 Connexion
- Ouvrir [localhost:4200](http://localhost:4200/) dans votre navigateur.
- Pour s'inscrire, l'utilisateur doit fournir un email ainsi qu'un mot de passe qui doit contenir 8 caractères minimum (dont 1 majucules, 1 chiffre, sans espaces) 

## 🔧 TECHNOLOGIES UTILISÉES
- Framework : Express
- Serveur : NodeJS
- Base de données : MongoDB
- Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données strictes
