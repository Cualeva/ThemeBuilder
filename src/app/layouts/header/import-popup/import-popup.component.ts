import { Component, ViewChild } from '@angular/core';
import { alert } from 'devextreme/ui/dialog';
import { GoogleAnalyticsEventsService } from '../../../google-analytics-events.service';
import { ImportService } from '../../../import.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
    selector: 'app-import-popup',
    templateUrl: './import-popup.component.html',
    styleUrls: ['./import-popup.component.css']
})
export class ImportPopupComponent {
    @ViewChild('popup') popup: PopupComponent;

    constructor(
        private importService: ImportService,
        private googleAnalyticsEventsService: GoogleAnalyticsEventsService
    ) { }

    selectedIndex = 0;
    importValue = '';

    applyClick(t): void {
        this.importService.importMetadata(t.value, 'advanced').then(() => {
            this.popup.hide();
            t.value = '';
        }, (err) => {
            console.error(err);
            alert('Metadata has a wrong format.', 'Error');
        });
    }

    imported(): void {
        this.popup.hide();
    }
}
