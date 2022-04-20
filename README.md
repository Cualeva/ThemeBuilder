[![CircleCI](https://circleci.com/gh/DevExpress/ThemeBuilder.svg?style=svg)](https://circleci.com/gh/DevExpress/ThemeBuilder)

# DevExtreme ThemeBuilder UI
 
The DevExtreme ThemeBuilder UI allows you to modify themes shipped with DevExtreme or create custom themes. This tool is available [online](https://devexpress.github.io/ThemeBuilder/).
 
If you need to run the ThemeBuilder UI locally, clone this repository and follow the instructions below.

## Prerequisites

You will need Node.js 12.16 or higher and npm 5.5.1 or higher.

## Install required packages and Launch

Run the following commands:
 
```
npm install
npm start
```

Go to http://localhost:4200/.

NOTE: The ThemeBuilder UI creates themes for the latest minor DevExtreme version. If you want to create a theme for a specific version, use the [ThemeBuilder CLI](https://js.devexpress.com/Documentation/Guide/Common/DevExtreme_CLI/#ThemeBuilder).

## NOTE CUALEVA
Aggiunto "--watch" nel comando scripts->build del file "package.json":
questo permette ad IIS di runnare il progetto buildato senza dover startare la build tramite command line (http-server -p <porta> <path>)
Il motivo è che il progetto sarà utilizzabile senza usare node.js come web server, ma il progetto intero verrà servito al client come un sito statico.

Aggiunto il file web.config e la voce "src/web.config" in projects->devextreme-themebuilder-app->architect->build->assets del file "angular.json":
questo permette la navigazione tramite gli url
ATTENZIONE: questo Web.config potrebbe causare interazioni inaspettate sugli altri siti hostati da IIS
Link utile: https://levelup.gitconnected.com/how-to-deploy-angular-app-to-an-iis-web-server-complete-setup-337997486423

Spostato "@angular/cli": "^9.1.7", da devDependencies a dependencies nel file "package.json", questo per non obbligare ad installare angular-cli (non è più necessario utilizzare il comando npm install @angular/cli -g)

Per la pubblicazione è necessario:
    - aprire il command prompt
    - spostarsi nella cartella del progetto
    - eseguire il comando "npm run build":
        quando il comando termina, node.js rimane "in ascolto" e il processo va killato...
        al termine verrà creata la cartella "dist" nel progetto
    - prendere il contenuto di "dist" e pubblicarlo in IIS come sito statico
