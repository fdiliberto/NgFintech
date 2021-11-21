import {Component, OnInit} from '@angular/core';
import {Movement} from '../../models/movements.model';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'fd-movements',
    template: `
        <fd-intro-page
                description="In questa pagina potrai visualizzare la lista dei movimenti per ogni carta selezionata.">
            <div class="d-flex justify-content-around align-items-center mt-4">
                <h2 class="text-center text-warning fw-bold">Saldo: {{2000 | currency}} </h2>
                <mat-form-field appearance="fill" class="w-25 mb-0">
                    <mat-label>Seleziona carta per visualizzare i movimenti...</mat-label>
                    <mat-select [formControl]="cardControl">
                        <mat-option *ngFor="let card of cards" [value]="card">
                            {{card}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
        </fd-intro-page>
        <div class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
            <fd-movement *ngFor="let mov of movs"
                         [type]="mov.type"
                         [amount]="mov.amount"
                         [title]="mov.title"
                         [description]="mov.description"
                         [dateAsTimeStamp]="mov.timestamp">
            </fd-movement>
            <button type="button" mat-raised-button color="primary" class="w-100">Carica altro (2/100)</button>
        </div>

    `,
    styles: []
})
export class MovementsComponent implements OnInit {

    // TODO
    cards = [22222222222, 33333333];

    movs: Movement[] = [
        {
            _id: '1',
            title: 'Titolo mov 1',
            type: 'in',
            amount: 1000,
            cardId: '1',
            description: 'descrizione del movimento numero 1',
            timestamp: 1637080811
        },
        {
            _id: '2',
            title: 'Titolo mov 2',
            type: 'out',
            amount: 500,
            cardId: '2',
            description: 'descrizione del movimento numero 2',
            timestamp: 1628698810
        }
    ];


    cardControl = new FormControl('');

    constructor() {
    }

    ngOnInit(): void {
        // TODO
        this.cardControl.valueChanges.subscribe(cardNum => {
            console.log(cardNum);
        })
    }

}
