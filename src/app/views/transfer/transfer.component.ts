import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Contact} from '../../models/contact.model';
import {ContactsComponent} from './contacts/contacts.component';
import {filter, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'fd-transfer',
    template: `
        <fd-intro-page description="In questa pagina potrai effettuare un trasferimento di denaro."></fd-intro-page>
        <mat-card class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
            <div class="d-flex justify-content-center">
                <form [formGroup]="transferForm" (ngSubmit)="submit()" class="col-md-5 mt-3">
                    <button type="button" mat-raised-button class="w-100 mb-3" (click)="openContacts()">
                        Lista contatti
                    </button>
                    <mat-form-field appearance="fill" class="d-block mb-2">
                        <mat-label>Nome</mat-label>
                        <input formControlName="name" matInput>
                        <mat-error *ngIf="name!.hasError('required')">
                            Nome <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="d-block mb-2">
                        <mat-label>Cognome</mat-label>
                        <input formControlName="surname" matInput>
                        <mat-error *ngIf="surname!.hasError('required')">
                            Cognome <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="d-block mb-2">
                        <mat-label>IBAN</mat-label>
                        <input formControlName="iban" matInput>
                        <mat-error *ngIf="iban!.hasError('required')">
                            IBAN <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="d-block mb-2">
                        <mat-label>Importo</mat-label>
                        <input type="number" formControlName="amount" matInput>
                        <mat-error *ngIf="amount!.hasError('required')">
                            Importo <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="d-block mb-2">
                        <mat-label>Seleziona carta</mat-label>
                        <mat-select formControlName="cardId">
                            <mat-option [value]="1">
                                22222222222222222
                            </mat-option>
                            <mat-option [value]="2">
                                333333333333333
                            </mat-option>
                        </mat-select>
                        <mat-error *ngIf="cardId!.hasError('required')">
                            Selezione della carta <strong>richiesta</strong>
                        </mat-error>
                    </mat-form-field>
                    <button mat-raised-button color="primary" class="w-100" [disabled]="!transferForm.valid">Traferisci
                        denaro
                    </button>
                </form>
            </div>
        </mat-card>
    `,
    styles: []
})
export class TransferComponent implements OnInit {
    // TODO
    contacts: Contact[] = [
        {
            name: 'Fabio',
            surname: 'Di Liberto',
            iban: '123468798798789',
            _id: '1'
        },
        {
            name: 'Luana',
            surname: 'Rossi',
            iban: '1211111111111111',
            _id: '2'
        },
        {
            name: 'Gabriele',
            surname: 'Gerardi',
            iban: '88888888989',
            _id: '3'
        }
    ]

    transferForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        iban: ['', Validators.required],
        amount: ['', Validators.required],
        cardId: ['', Validators.required]
    })

    get name() {
        return this.transferForm.get('name');
    }

    get surname() {
        return this.transferForm.get('surname');
    }

    get iban() {
        return this.transferForm.get('iban');
    }

    get amount() {
        return this.transferForm.get('amount');
    }

    get cardId() {
        return this.transferForm.get('cardId');
    }


    constructor(private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
    }

    openContacts() {
        let contactsDialogRef = this.dialog.open(ContactsComponent, {
            width: '400px',
            data: this.contacts
        });

        contactsDialogRef.afterClosed().pipe(
            map(c => {
                const contact = c as Contact;
                return contact ? contact : EMPTY;
            })
        ).subscribe(contact => this.transferForm.patchValue(contact));
    }

    submit() {
        if (this.transferForm.valid) {
            console.log(this.transferForm)

            // TODO chiamata server
            setTimeout(() => {
                this.snackBar.open('Trasferimento completato', '', {duration: 2000});
            });
        }
    }
}
