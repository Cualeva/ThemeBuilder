import { Component, ViewChild } from '@angular/core';
//import { GoogleAnalyticsEventsService } from '../../../google-analytics-events.service';
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
        private importService: ImportService
    ) { }
/*
    radioGroupData = [{
        text: 'Bootstrap 5',
        value: 0,
        version: 5,
        acceptFormat: '.scss',
        uploadButtonText: 'Upload SCSS Variables'
    }];
*/
    selectedIndex = 0;
    importValue = '';

    applyClick(t): void {
        this.importService.importMetadata(t.value, 'advanced').then(() => {
            this.popup.hide();
            t.value = '';
        }, (err) => {
            console.error(err);
        });
    }

    imported(): void {
        this.popup.hide();
    }
}
