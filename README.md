# Boite Annonces

Boite Annonces est une application web permettant aux utilisateurs de créer, modifier et consulter des annonces. L'application utilise Vue.js pour le frontend et Express.js pour le backend.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MongoDB

## Installation

1. Clonez le dépôt :

   ```sh
   git clone https://github.com/votre-utilisateur/boite-annonces.git
   cd boite-annonces
   ```
2. Installez les dépendances pour le backend :
   
   ```sh
   cd api-avancee-dm
   npm install
   ```

3. Installez les dépendances pour le frontend :


   ```sh
   cd boite-annonces-frontend
   npm install
   ```

## Configuration

1. Créez un fichier .env dans le répertoire api-avancee-dm et ajoutez les variables d'environnement suivantes :
   
   ```sh
   MONGODB_URI=mongodb://localhost:27017/boite-annonces
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   ```

## Démarrage

1. Démarrez le serveur backend :
   
   ```sh
   cd api-avancee-dm
   npm start
   ```

2. Démarrez le serveur frontend :
   
   ```sh
   cd boite-annonces-frontend
   npm run serve
   ```

3. Ouvrez votre navigateur et accédez à http://localhost:8080

## Fonctionnalités

- **Inscription et connexion des utilisateurs** : Les utilisateurs peuvent s'inscrire et se connecter pour accéder aux fonctionnalités de l'application.
- **Création d'annonces** : Les utilisateurs connectés peuvent créer de nouvelles annonces.
- **Modification d'annonces** : Les utilisateurs connectés peuvent modifier leurs annonces existantes.
- **Consultation des annonces** : Tous les utilisateurs peuvent consulter les annonces disponibles.

## Structure du projet

### Backend

Le backend est construit avec Express.js et MongoDB. Les principaux fichiers et répertoires sont :

- `app.js` : Configuration de l'application Express.
- `authcontroller.js` : Contrôleur pour l'authentification des utilisateurs.
- `announcementcontroller.js` : Contrôleur pour la gestion des annonces.
- `authMiddleware.js` : Middleware pour vérifier l'authentification des utilisateurs.

### Frontend

Le frontend est construit avec Vue.js. Les principaux fichiers et répertoires sont :

- `src/main.js` : Point d'entrée principal de l'application Vue.js.
- `src/App.vue` : Composant principal de l'application.
- `src/components/UserAnnouncements.vue` : Composant pour afficher les annonces.
- `src/components/EditAnnouncement.vue` : Composant pour modifier une annonce.
- `src/components/CreateAnnouncement.vue` : Composant pour créer une nouvelle annonce.

## API

### Authentification

- `POST /api/auth/signup` : Inscription d'un nouvel utilisateur.
- `POST /api/auth/signin` : Connexion d'un utilisateur existant.
- `POST /api/auth/logout` : Déconnexion de l'utilisateur.

### Annonces

- `POST /api/announcements` : Création d'une nouvelle annonce (authentification requise).
- `PUT /api/announcements/:id` : Modification d'une annonce existante (authentification requise).
- `DELETE /api/announcements/:id` : Suppression d'une annonce existante (authentification requise).
- `GET /api/announcements` : Récupération de toutes les annonces (authentification requise).
- `GET /api/announcements/:id` : Récupération d'une annonce spécifique (authentification requise).

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des modifications que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

