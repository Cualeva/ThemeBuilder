import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GlobalVariable } from './app/global';
import config from 'devextreme/core/config';
config({ licenseKey: GlobalVariable.license });

if(environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err) => console.log(err));
