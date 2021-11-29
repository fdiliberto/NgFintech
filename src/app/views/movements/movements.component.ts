import {Component, OnInit} from '@angular/core';
import {Movement} from '../../models/movements.model';
import {FormControl} from '@angular/forms';
import {CardsService} from '../../api/cards.service';
import {BehaviorSubject, combineLatest, EMPTY, merge, Observable, of} from 'rxjs';
import {Card} from '../../models/card.model';
import {ActivatedRoute,} from '@angular/router';
import {distinctUntilChanged, filter, map, mergeMap, startWith, switchMap, take, tap} from 'rxjs/operators';

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
                        <mat-option *ngFor="let card of cards$ | async" [value]="card">
                            {{card.number}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
        </fd-intro-page>
        <div class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
            <ng-container *ngIf="movs$ | async as movs">
                <ng-container *ngIf="movs.length; else noDataTpl">
                    <fd-movement *ngFor="let mov of movs"
                                 [type]="mov.type"
                                 [amount]="mov.amount"
                                 [title]="mov.title"
                                 [description]="mov.description"
                                 [dateAsTimeStamp]="mov.timestamp">
                    </fd-movement>
                    <button type="button" mat-raised-button color="primary" class="w-100" *ngIf="movs.length">Carica
                        altro (2/100)
                    </button>
                </ng-container>
                <ng-template #noDataTpl>
                    <fd-no-data-found></fd-no-data-found>
                </ng-template>
            </ng-container>
        </div>
    `,
    styles: []
})
export class MovementsComponent implements OnInit {
    cards$ = new BehaviorSubject<Card[]>([]);
    movs$ = new BehaviorSubject<Movement[]>([]);

    cardControl = new FormControl('');

    constructor(private cardService: CardsService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.cardService.getCards().subscribe(cards => this.cards$.next(cards));
        //this.cards2$ = this.cardService.getCards().pipe(shareReplay(1));

        const cardIdFromParams$ = this.route.params.pipe(
            filter(params => !!params),
            map(params => params.cardId)
        ) as Observable<string>;

        const cardIdFromSelect$ = this.cardControl.valueChanges.pipe(
            startWith(null),
            filter(card => !!card),
            map(card => (card as Card)._id)
        ) as Observable<string>;

        combineLatest([cardIdFromParams$, cardIdFromSelect$]).pipe(
            map(([cardIdFromParams, cardIdFromSelect]) => cardIdFromSelect ? cardIdFromSelect : cardIdFromParams),
            tap((id) => console.log(id)),
            switchMap(cardId => this.cardService.getCardMovs(cardId))
        ).subscribe(movs => this.movs$.next(movs.data)); // TODO
    }
}
