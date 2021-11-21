import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'fd-intro-page',
    template: `
        <mat-card class="container mb-5 animate__animated animate__fadeIn">
            <p class="border border-1 p-2 b-dashed fst-italic">
                {{description}}
            </p>
            <ng-content></ng-content>
        </mat-card>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroPageComponent {
    @Input() description: string | null = null;
}
