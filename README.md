
# Projet Quizz FP avec ts-belt

## Description

Ce projet a pour objectif de vous permettre de construire vous-même les routes du backend en utilisant Node.js, Express et TypeScript. Vous travaillerez avec des fichiers JSON contenant des questions thématiques, que vous allez manipuler pour créer des endpoints API dynamiques.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** : Vous pouvez le télécharger depuis [le site officiel](https://nodejs.org/).
- **pnpm** : Un gestionnaire de paquets rapide et efficace.

### Installation de pnpm

Pour installer pnpm, exécutez la commande suivante dans votre terminal :

```bash
npm install -g pnpm
```

## Installation des dépendances

Une fois que vous avez cloné le dépôt, accédez au répertoire du projet et installez les dépendances en exécutant :

```bash
pnpm i
```

## Lancer le projet en mode développement

### Compilation automatique

Dans un terminal, lancez la commande suivante pour compiler le code TypeScript en mode auto-watch :

```bash
pnpm build:dev
```

### Démarrage du serveur en mode développement

Dans un autre terminal, démarrez le serveur en mode développement avec :

```bash
pnpm start:dev
```

## Objectif du projet

L'objectif de ce projet est de manipuler des fichiers JSON pour construire dynamiquement des endpoints API. Voici les étapes que vous devez suivre :

1. **Charger et concaténer les fichiers JSON :**  
   Les fichiers JSON se trouvent dans le dossier `src/data`. Chaque fichier JSON contient une série de questions structurées de la manière suivante :

   ```json
   {
       "theme": "Introduction à la Programmation Fonctionnelle",
       "question": "Quel est un exemple de langage impératif ?",
       "options": ["A) Haskell", "B) JavaScript", "C) Scala", "D) Elm"],
       "correct": "B"
   }
   ```

   Votre première tâche consiste à ouvrir tous les fichiers JSON et à les concaténer en un seul tableau.

2. **Manipulation des options de réponse :**  
   Après avoir concaténé les données, vous devez mélanger aléatoirement les options de réponse pour chaque question, puis mettre à jour la clé `correct` en fonction de ce nouveau mélange.

3. **Regroupement par thème :**  
   Ensuite, vous devez regrouper les questions par thème. Chaque thème représentera un endpoint de l'API.

4. **Construction des endpoints API :**  
   Pour chaque thème, vous allez créer un endpoint API qui renverra du HTML ou du TSX. Ce contenu affichera toutes les questions du thème ainsi que les réponses proposées. Chaque question aura un bouton "see answer" qui, une fois cliqué, affichera la réponse correcte.
