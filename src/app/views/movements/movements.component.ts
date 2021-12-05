import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Movement} from '../../models/movements.model';
import {FormControl} from '@angular/forms';
import {CardsService} from '../../api/cards.service';
import {BehaviorSubject} from 'rxjs';
import {Card} from '../../models/card.model';
import {ActivatedRoute,} from '@angular/router';
import {map} from 'rxjs/operators';

export type pagination = { limit: number, offset: number };

@Component({
    selector: 'fd-movements',
    template: `
        <fd-intro-page
                description="In questa pagina potrai visualizzare la lista dei movimenti per ogni carta selezionata.">
            <div class="d-flex justify-content-around align-items-center mt-4">
                <h2 class="text-center text-warning fw-bold">Saldo: {{balance | currency}} </h2>
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
                <ng-container *ngIf="movs.data.length">
                    <fd-movement *ngFor="let mov of movs.data"
                                 [type]="mov.type"
                                 [amount]="mov.amount"
                                 [title]="mov.title"
                                 [description]="mov.description"
                                 [dateAsTimeStamp]="mov.timestamp">
                    </fd-movement>
                </ng-container>
                <fd-button-pagination [resetPagination]="resetPagination"
                                      [disabled]="disablePagination"
                                      (loadMore)="loadMore($event)">
                </fd-button-pagination>
                <fd-no-data-found *ngIf="!movs.data.length"></fd-no-data-found>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsComponent implements OnInit {
    cards$ = new BehaviorSubject<Card[]>([]);
    movs$ = new BehaviorSubject<{ data: Movement[], total: number }>({data: [], total: 0});

    disablePagination = false;
    resetPagination = false;
    balance = 0;

    cardControl = new FormControl('');

    constructor(private cardService: CardsService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.cardService.getCards().subscribe(cards => this.cards$.next(cards));

        this.route.params.pipe(
            map(params => params.cardId || '')
        ).subscribe(cardId => this.cardControl.setValue(cardId));

        this.cardControl.valueChanges.subscribe(() => this.reset());
    }

    loadMore(pag: pagination) {
        if (this.cardControl.value) {
            this.cardService.getCardMovs(this.cardControl.value, pag.limit, pag.offset).subscribe(movs => {
                const currentData = this.movs$.getValue();
                const finalData = [...currentData.data, ...movs.data];
                this.movs$.next({data: finalData, total: movs.total});
                this.disablePagination = finalData.length === movs.total;
                this.resetPagination = this.disablePagination;
                this.getBalance(finalData);
            });
        }
    }

    getBalance(movs: Movement[]) {
        this.balance = movs.reduce((acc, current) => acc + (current.amount * (current.type === 'out' ? -1 : 1)), 0);
    }

    reset() {
        this.movs$.next({data: [], total: 0});
        this.disablePagination = false;
        this.resetPagination = true;
        this.balance = 0;
    }
}
