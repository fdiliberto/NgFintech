import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../../models/card.model';

@Component({
    selector: 'fd-card-list',
    template: `
        <div class="d-flex align-items-center" *ngFor="let card of cards; let last = last"
             [ngClass]="{'border-bottom': !last }">
            <div class="p-2 flex-grow-1">
                <p>
                    <mat-icon class="position-relative card-icon">credit_card</mat-icon>
                    {{card.number}} <small class=" fw-bold">({{card.type}})</small>
                </p>
                <p class="fst-italic text-success fw-bold">{{card.amount | currency }}</p>
            </div>
            <div class="p-2">
                <mat-icon class="pointer" matTooltip="Visualizza movimenti" [matTooltipPosition]="'left'"
                          (click)="viewMovements.emit(+card._id)">
                    receipt_long
                </mat-icon>
            </div>
            <div class="p-2">
                <mat-icon class="pointer text-danger" matTooltip="Rimuovi" [matTooltipPosition]="'right'"
                          (click)="delete.emit(+card._id)">
                    delete
                </mat-icon>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <button mat-raised-button color="primary" class="w-100 mt-2" (click)="addCard.emit()">Aggiungi carta
            </button>
        </div>
    `,
    styles: [`
        .card-icon {
            top: 7px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
    @Input() cards: Card[] | null = []
    @Output() viewMovements = new EventEmitter<number>();
    @Output() delete = new EventEmitter<number>();
    @Output() addCard = new EventEmitter<void>();
}
