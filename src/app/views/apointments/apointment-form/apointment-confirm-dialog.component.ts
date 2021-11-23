import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DayWithSlot} from '../../../models/day-with-slot.model';

@Component({
    selector: 'fd-apointment-confirm-dialog',
    template: `
        <div mat-dialog-content>
            <h2>Conferma appuntamento</h2>
            <p class="pt-2">Sicuri di voler confermare l'appuntamento per il giorno: <span
                    class="fw-bold text-primary">{{data.day}}</span> alle
                ore <span class="fw-bold text-primary">{{data.slot | timeString}}</span> ?</p>
        </div>
        <div mat-dialog-actions>
            <button mat-button [mat-dialog-close]="false">Annulla</button>
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Conferma</button>
        </div>
    `,
    styles: []
})
export class ApointmentConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DayWithSlot) {
    }
}
