import {Component, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
import {CardCreate} from '../../models/card-create.model';
import {CardFormComponent} from './card-form/card-form.component';

@Component({
    selector: 'fd-cards',
    template: `
        <mat-drawer-container class="bg-transparent">
            <mat-drawer #drawer mode="over" position="end" class="position-fixed overflow-auto w-25"
                        [disableClose]="true">
                <div class="m-3">
                    <!-- workaround con if per evitare che il form rimanga validato e mostri gli errori -->
                    <fd-card-form
                            *ngIf="drawer.opened"
                            (cancel)="drawer.toggle()"
                            (createCard)="drawer.close(); addCard($event);">
                    </fd-card-form>
                </div>
            </mat-drawer>
            <mat-drawer-content [ngClass]="{'vh-100': drawer.opened}">
                <fd-intro-page
                        description="In questa pagina potrai visualizzare la lista delle carte attive.">
                </fd-intro-page>
                <mat-card class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
                    <fd-card-list
                            [cards]="cards"
                            (viewMovements)="viewMovementsHandler($event)"
                            (delete)="deleteMovementsHandler($event)"
                            (addCard)="drawer.open()">
                    </fd-card-list>
                </mat-card>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    styles: []
})
export class CardsComponent implements OnInit {
    @ViewChild(CardFormComponent) cardFormComp!: CardFormComponent;

    cards: Card[] = [
        {
            number: '12345 56879 22222 12145',
            type: 'visa',
            amount: 145785,
            owner: '',
            ownerId: '1',
            _id: '1'
        },
        {
            number: '12345 56879 22222 12145',
            type: 'mastercard',
            amount: 6547899,
            owner: '',
            ownerId: '1',
            _id: '2'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    viewMovementsHandler(idCard: number) {
        console.log('view mov', idCard);
    }

    deleteMovementsHandler(idCard: number) {
        console.log('delete mov', idCard);
    }

    addCard(cardToCreate: CardCreate) {
        if (cardToCreate) {
            // reset del form figlio
            this.cardFormComp.cleanup();
            console.log(' add card', cardToCreate);
        }
    }
}
