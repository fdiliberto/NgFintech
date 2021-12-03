import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Movement} from '../../models/movements.model';
import {FormControl} from '@angular/forms';
import {CardsService} from '../../api/cards.service';
import {BehaviorSubject, EMPTY, iif} from 'rxjs';
import {Card} from '../../models/card.model';
import {ActivatedRoute,} from '@angular/router';
import {distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';

export type pagination = { limit: number, offset: number };

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
                        <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
                            {{card.number}} <small class="fst-italic float-end me-1">({{card.owner}})</small>
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
        </fd-intro-page>
        <div class="col-auto m-2 animate__animated animate__fadeIn">
            <ng-container *ngIf="movs$ | async as movs">
                <ng-container *ngIf="movs.data?.length; else noDataTpl">
                    <fd-movement *ngFor="let mov of movs.data"
                                 [type]="mov.type"
                                 [amount]="mov.amount"
                                 [title]="mov.title"
                                 [description]="mov.description"
                                 [dateAsTimeStamp]="mov.timestamp">
                    </fd-movement>
                    <button type="button" mat-raised-button color="primary" class="w-100" *ngIf="movs.data.length"
                            (click)="loadMore()">
                        Carica altri dati (2/{{movs.total}})
                    </button>
                </ng-container>
                <ng-template #noDataTpl>
                    <fd-no-data-found></fd-no-data-found>
                </ng-template>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsComponent implements OnInit {
    cards$ = new BehaviorSubject<Card[]>([]);
    movs$ = new BehaviorSubject<{ data: Movement[], total: number } | null>(null);

    cardControl = new FormControl('');

    loadMore$ = new BehaviorSubject<pagination>({limit: 5, offset: 0});

    constructor(private cardService: CardsService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.cardService.getCards().subscribe(cards => this.cards$.next(cards));

        this.route.params.pipe(
            map(params => params.cardId || '')
        ).subscribe(cardId => this.cardControl.setValue(cardId));

        this.cardControl.valueChanges.pipe(
            startWith(this.route.snapshot.params.cardId || ''),
            switchMap(cardId => iif(() => cardId !== '', this.cardService.getCardMovs(cardId), EMPTY))
        ).subscribe(movs => this.movs$.next(movs)); // TODO
    }

    loadMore() {
        const currentPage= this.loadMore$.getValue();


        const nextPage: pagination = {limit: currentPage.limit + 5, offset: currentPage.limit};
        this.loadMore$.next(nextPage);
        console.log(this.loadMore$.getValue());
    }
}
