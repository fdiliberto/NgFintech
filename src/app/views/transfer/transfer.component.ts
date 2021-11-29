import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Contact} from '../../models/contact.model';
import {ContactsComponent} from './contacts/contacts.component';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContactsService} from '../../api/contacts.service';
import {TransferService} from '../../api/transfer.service';
import {Transfer} from '../../models/transfer.model';
import {CardsService} from '../../api/cards.service';
import {Card} from '../../models/card.model';
import {formReset} from '../../shared/utils/material-forms.utils.ts';

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
                            <mat-option [value]="card._id" *ngFor="let card of cards$ | async">
                                {{card.number}}
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

    cards$ = new BehaviorSubject<Card[]>([]);

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


    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private contactService: ContactsService,
                private transferService: TransferService,
                private cardService: CardsService) {

    }

    ngOnInit(): void {
        this.cardService.getCards().subscribe(cards => this.cards$.next(cards));
    }

    openContacts() {
        this.contactService.getContacts().pipe(
            map(contacts => {
                return this.dialog.open(ContactsComponent, {
                    width: '400px',
                    data: contacts
                });
            }),
            switchMap(contactsDialogRef => contactsDialogRef.afterClosed().pipe(
                map(c => {
                    const contact = c as Contact;
                    return contact ? contact : EMPTY;
                })
            ))
        ).subscribe(contact => this.transferForm.patchValue(contact));
    }

    submit() {
        if (this.transferForm.valid) {
            this.transferService.createTransfer(this.transferForm.value as Transfer).subscribe(success => {
                const msg = success
                    ? 'Trasferimento completato'
                    : 'Si sono verificati errori durante il trasferimento';
                this.snackBar.open(msg, undefined, {duration: 2000});
                formReset(this.transferForm);
            });
        }
    }
}
