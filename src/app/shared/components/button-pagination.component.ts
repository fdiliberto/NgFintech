import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Pagination Model
 */
export type pagination = { limit: number, offset: number };

@Component({
    selector: 'fd-button-pagination',
    template: `
        <button type="button" mat-raised-button color="primary" class="w-100" [disabled]="disabled"
                (click)="loadMoreHandler()">
            <ng-container *ngIf="pagination | async as pag">
                Carica dati...
            </ng-container>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonPaginationComponent implements OnChanges {
    @Input() limit = 5;
    @Input() resetPagination: boolean | null = null;
    @Input() disabled = false;
    @Output() loadMore = new EventEmitter<pagination>();

    pagination = new BehaviorSubject<pagination>({limit: 0, offset: 0})

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.resetPagination && changes.resetPagination.currentValue) {
            this.pagination.next({limit: 0, offset: 0});
        }
    }

    loadMoreHandler() {
        const lastPage = this.pagination.getValue();
        const nextPage: pagination = {limit: this.limit, offset: lastPage.limit + lastPage.offset}
        this.pagination.next(nextPage);
        this.loadMore.emit(this.pagination.getValue());
    }
}
