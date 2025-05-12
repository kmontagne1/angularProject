# 📦 Installation et mise en route d’un projet Angular sous Windows

## 🧰 Prérequis

- Node.js (version récente recommandée)
- npm (installé automatiquement avec Node.js)
- Visual Studio Code (ou tout autre IDE adapté)
- Git (optionnel mais utile)

---

## 1️⃣ Installation de Node.js

Téléchargez et installez la dernière version de Node.js depuis le site officiel :  
🔗 https://nodejs.org/fr

Après l'installation, vérifiez que tout est en place :

```bash
node --version
npm --version
```
---
## 2️⃣ Installation de l’Angular CLI

Pour installer Angular
```bash
npm install -g @angular/cli
```

Pour vérifier l'instalation : 
```bash
ng --version
```
---
## 3️⃣ Nettoyage du projet (si nécessaire)

Si vous avez cloné un projet Angular existant ou que vous rencontrez des erreurs de dépendances, effectuez un nettoyage :
```bash
rm -rf node_modules package-lock.json
```
💡 Sous Windows, vous pouvez utiliser les commandes suivantes dans le terminal :
```bash
rd /s /q node_modules
del package-lock.json
```
---
## 4️⃣ Réinstallation des dépendances

Une fois le nettoyage effectué, réinstallez les dépendances du projet :
```bash
npm install
```
---

## 5️⃣ Compilation du projet

Compilez le projet Angular pour vérifier qu’il fonctionne correctement :
```bash
ng build
```
---

## 6️⃣ Lancement du serveur de développement

Pour lancer le projet en local (sur http://localhost:4200) :
```bash
ng serve
```
---

## ✅ Résultat

Si tout est correct, votre application Angular sera accessible à cette adresse :
➡️ http://localhost:4200
🧼 Dépannage (en cas d’erreurs)

Supprimez le cache npm :
```bash
npm cache clean --force
```
Recommencez les étapes 3 à 5.

---
---

# Ponyracer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
