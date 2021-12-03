import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'fd-dashboard',
    template: `
        <mat-sidenav-container class="vh-100 bg-transparent">
            <mat-sidenav mode="side" opened class="col-md-2">
                <h2 class="fw-bold text-center p-3 border-bottom shadow">Menù</h2>
                <fd-navbar></fd-navbar>
            </mat-sidenav>
            <mat-sidenav-content>
                <mat-toolbar class="text-center bg-primary shadow">
                    <span class="text-light">NgFintech <small
                            class="mat-small fst-italic m-3">(Dashboard)</small></span>
                </mat-toolbar>
                <!--                <fd-welcome></fd-welcome>-->
                <div class="mt-3">
                    <router-outlet></router-outlet>
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
}
