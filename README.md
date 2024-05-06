# PATHFINDER

PathFinder est une application mobile développée en React Native utilisant Expo Go. Elle permet aux utilisateurs de visualiser et de découvrir des randonnées à travers une interface conviviale.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js
- npm (ou yarn)
- Expo Go (sur votre appareil mobile)

## Installation

1. Clonez ce dépôt sur votre machine locale :

```
git clone https://github.com/marieliserenzema/pathfinder-frontend-website
```

2. Accédez au répertoire du projet :

```
cd pathfinder-frontend-mobile-app
```

3. Installez les dépendances :

```
npm install
```


## Configuration de l'API

Pour que l'application fonctionne correctement, vous devez obtenir une clé API à partir du serveur de l'application. 
Contactez l'administrateur du serveur pour obtenir cette clé ou vous pouvez aller sur le server directement dans le fichier 'home/user/project/key_for_mobile_app.txt'

Une fois que vous avez la clé API, vous devez la placer dans le fichier `.env.local` à la racine du projet. 
Assurez-vous que ce fichier contienne la variable suivante :
```
FIREBASE_API_KEY=bla_bla
```


## Démarrage de l'application

Une fois que vous avez configuré la clé API, vous pouvez démarrer l'application en exécutant la commande suivante :

```
npx expo start
```



