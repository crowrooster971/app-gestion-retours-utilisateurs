const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Remplacez par votre URI MongoDB
const mongoURI = 'mongodb://localhost:27017/retoursUtilisateurs';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Erreur de connexion à la base de données', err));

// Modèle de retour
const retourSchema = new mongoose.Schema({
  produit: String,
  commentaire: String,
  note: Number,
  sentiment: String
});

const Retour = mongoose.model('Retour', retourSchema);

// Route pour soumettre un retour
app.post('/api/retours', async (req, res) => {
  const { produit, commentaire, note, sentiment } = req.body;
  const nouveauRetour = new Retour({ produit, commentaire, note, sentiment });
  try {
    await nouveauRetour.save();
    res.status(201).send(nouveauRetour);
  } catch (err) {
    // En cas d'erreur lors de la sauvegarde, envoyer une réponse d'erreur
    res.status(500).send({ message: 'Erreur lors de la soumission du retour', error: err });
  }
});

// Route pour obtenir les retours
app.get('/api/retours', async (req, res) => {
  const retours = await Retour.find();
  res.status(200).send(retours);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});