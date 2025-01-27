require('dotenv').config();
const mongoose = require('mongoose');

const deleteDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in the environment variables');
        }

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connexion à MongoDB réussie !');

        // Supprimer la base de données
        await mongoose.connection.db.dropDatabase();
        console.log('Base de données supprimée avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la suppression de la base de données :', error);
        process.exit(1);
    }
};

deleteDatabase();