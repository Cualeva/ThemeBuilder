import { Component } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { ImportService } from './import.service';
import { Router } from '@angular/router';
import { GlobalVariable } from './global';
import { locale } from 'devextreme/localization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(private importService: ImportService, private route: Router) {
        window.addEventListener('message', function (ev) {
            if (ev.origin === window.location.origin)
                return;
            switch (ev.data?.type) {
                case "loadMetaData":
                    GlobalVariable.version = ev.data.version;
                    GlobalVariable.isDefaultTheme = ev.data.isDefaultTheme;
                    GlobalVariable.translations = ev.data.translations || {};
                    if (ev.data.language != null && ev.data.language != "") {
                        locale(ev.data.language);
                    }
                    importService.importMetadata(JSON.stringify(JSON.parse(ev.data.metaData)), 'advanced').then(null, (das?) => {
                        console.error(das);
                        alert('Metadata has a wrong format.', 'Error');
                    });
                    break;
                default:
                    break;
            }
        });
        parent.postMessage({ type: "loaded", data: null }, "*");
    }
}
