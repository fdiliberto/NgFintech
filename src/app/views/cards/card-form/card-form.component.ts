import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CardCreate} from '../../../models/card-create.model';
import {requiredLengthValidator} from '../validators/requiredLength.validator';

@Component({
    selector: 'fd-card-form',
    template: `
        <h1 class="text-center pb-4"><span class="fst-italic">Aggiungi nuova carta</span></h1>
        <form [formGroup]="cardForm" (ngSubmit)="createCard.emit(cardForm.value);">
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Tipo di carta</mat-label>
                <mat-select formControlName="type">
                    <mat-option *ngFor="let cardType of ['visa', 'mastercard']" [value]="cardType">
                        {{cardType | titlecase}}
                    </mat-option>
                </mat-select>
                <mat-error *ngIf="typeControl!.hasError('required')">
                    Tipologia carta <strong>richiesto</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Nome</mat-label>
                <input formControlName="name" matInput>
                <mat-error *ngIf="nameControl!.hasError('required')">
                    Nome <strong>richiesto</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Cognome</mat-label>
                <input formControlName="surname" matInput>
                <mat-error *ngIf="surnameControl!.hasError('required')">
                    Cognome <strong>richiesto</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>N° Carta</mat-label>
                <input type="text" formControlName="number" matInput>
                <mat-error *ngIf="numberControl!.hasError('required')">
                    Numero carta <strong>richiesto</strong>
                </mat-error>
                <mat-error *ngIf="!numberControl!.hasError('required') &&  numberControl?.errors?.requiredLength">
                    Il numero carta deve essere di <strong>16 caratteri</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>CVV</mat-label>
                <input type="text" formControlName="cvv" matInput>
                <mat-error *ngIf="cvvControl!.hasError('required')">
                    Codice CVV <strong>richiesto</strong>
                </mat-error>
                <mat-error *ngIf="!cvvControl!.hasError('required') && cvvControl!.errors?.requiredLength">
                    Il codice CVV deve essere di <strong>3 caratteri</strong>
                </mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" class="w-100 mt-2" [disabled]="!cardForm.valid">
                Aggiungi carta
            </button>
            <button type="button" mat-raised-button class="w-100 mt-1"
                    (click)="cleanup(); cancel.emit();">
                Annulla
            </button>
        </form>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent {
    @Output() createCard = new EventEmitter<CardCreate>();
    @Output() cancel = new EventEmitter<void>();

    cardForm = this.fb.group({
        type: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        number: ['', [Validators.required, requiredLengthValidator(16)]],
        cvv: ['', [Validators.required, requiredLengthValidator(3)]],
    });


    get typeControl() {
        return this.cardForm.get('type');
    }

    get nameControl() {
        return this.cardForm.get('name');
    }

    get surnameControl() {
        return this.cardForm.get('surname');
    }

    get numberControl() {
        return this.cardForm.get('number');
    }

    get cvvControl() {
        return this.cardForm.get('cvv');
    }

    constructor(private fb: FormBuilder) {
    }

    cleanup() {
        this.cardForm.reset();
        this.cardForm.markAsPristine();
        this.cardForm.markAsUntouched();
        this.cardForm.updateValueAndValidity();
    }
}
