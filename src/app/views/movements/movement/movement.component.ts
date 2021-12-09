import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'fd-movement',
    template: `
        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false" class="mb-2">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    <small class="fst-italic me-2">[{{ dateAsTimeStamp | date: 'dd/MM/yyyy'}}]</small>
                    <span class="fw-bold ms-2 me-2"
                          [ngClass]="{'text-success': type==='in', 'text-danger': type==='out'}">
                        {{amount | currency}}
                    </span>
                    <span class="fw-bold fst-italic ms-4">{{title}}</span>
                </mat-panel-title>
                <mat-panel-description *ngIf="description">
                    {{ description | truncate: 15 }}
                </mat-panel-description>
            </mat-expansion-panel-header>
            <p>{{description}}</p>
        </mat-expansion-panel>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent {
    @Input() dateAsTimeStamp: number | null = null;
    @Input() amount: number | null = null;
    @Input() type: 'in' | 'out' | null = null;
    @Input() title: string | null = null;
    @Input() description: string | null = null;

    panelOpenState = false;
}
