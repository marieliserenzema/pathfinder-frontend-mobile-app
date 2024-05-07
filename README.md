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
git clone https://github.com/marieliserenzema/pathfinder-frontend-mobile-app
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
Contactez l'administrateur du serveur pour obtenir cette clé ou vous pouvez aller sur le server directement dans le fichier `/home/user/project/key_for_mobile_app.txt`

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

Sans modification supplémentaire, votre application Pathfinder sera fonctionnel et aura accès aux données du serveur hébergé chez Ynov.
Vous aurez juste à vous connecter et commencer à explorer la carte interactive !

Si vous souhaitez utiliser l'application avec votre propre serveur, veuillez suivre le Readme de pathfinder-backend et de modifier le .env avec votre url ngrok.


## Informations importantes

La version de l'application que vous venez de récupérer possède des données en durs afin que de vous donner la possibilité de tester une des fonctionnalités.  
En effet, la création d'alerte une fois qu'une randonnée est en mode suivi est limité aux utilisateurs proches de cette dernière (une centaine de mètres).
Il est donc difficile de tester la fonctionnalité sans être proche d'une randonnée.  
Vous trouverez ainsi des valeurs de positions en durs dans le composant `map.tsx` commençant à la ligne 131 ainsi que d'autres consignes en commentaires si vous
souhaitez désactiver l'utilisation de ces valeurs.
