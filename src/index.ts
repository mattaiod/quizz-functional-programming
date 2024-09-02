import express, { Request, Response } from "express";
import { makeRouteServer } from "./routes";

// Initialisation de l'application Express
const app = express();

// Définition du port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

console.log(`🏁 Server is starting`);

// Créer Routes
makeRouteServer(app);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
