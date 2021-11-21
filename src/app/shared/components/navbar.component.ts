import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fd-navbar',
    template: `
        <mat-nav-list>
            <a mat-list-item
               [routerLink]="['/dashboard']"
               [routerLinkActive]="'bg-primary  text-light'"
               [routerLinkActiveOptions]="{exact: true}">
                <mat-icon class="me-3">home</mat-icon>
                Home
            </a>
            <a mat-list-item
               [routerLink]="['/dashboard', 'cards']"
               [routerLinkActive]="'bg-primary text-light'">
                <mat-icon class="me-3">credit_card</mat-icon>
                Carte
            </a>
            <a mat-list-item
               [routerLink]="['/dashboard', 'movements']"
               [routerLinkActive]="'bg-primary text-light'">
                <mat-icon class="me-3">receipt_long</mat-icon>
                Movimenti
            </a>
            <a mat-list-item
               [routerLink]="['/dashboard', 'transfer']"
               [routerLinkActive]="'bg-primary text-light'">
                <mat-icon class="me-3">paid</mat-icon>
                Trasferisci
            </a>
            <a mat-list-item
               [routerLink]="['/dashboard', 'apointments']"
               [routerLinkActive]="'bg-primary text-light'">
                <mat-icon class="me-3">event</mat-icon>
                Appuntamenti
            </a>
            <a mat-list-item
               [routerLink]="['/dashboard', 'taxes']"
               [routerLinkActive]="'bg-primary text-light'">
                <mat-icon class="me-3">summarize</mat-icon>
                Tasse
            </a>
            <a mat-list-item [routerLink]="[]">
                <mat-icon class="me-3">person</mat-icon>
                UTENTE TODO</a>
        </mat-nav-list>
    `,
    styles: []
})
export class NavbarComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
