import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Contact} from '../../../models/contact.model';

@Component({
    selector: 'fd-contact-form',
    template: `
        <div class="d-flex justify-content-center animate__animated animate__fadeIn">
            <form [formGroup]="contactForm" class="w-100" (ngSubmit)="submit()">
                <button type="button" mat-raised-button (click)="back.emit()" class="w-100 mb-4">Indietro</button>
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
                    <mat-label>IBAN</mat-label>
                    <input type="text" formControlName="iban" matInput>
                    <mat-error *ngIf="ibanControl!.hasError('required')">
                        IBAN <strong>richiesto</strong>
                    </mat-error>
                </mat-form-field>
                <button mat-raised-button color="primary" class="w-100" [disabled]="!contactForm.valid">Salva
                </button>
            </form>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {
    @Input() contactToEdit: Contact | null = null;
    @Output() saveContact = new EventEmitter<Omit<Contact, '_id'>>();
    @Output() back = new EventEmitter();

    contactForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        iban: ['', Validators.required],
    });

    get nameControl() {
        return this.contactForm.get('name');
    }

    get surnameControl() {
        return this.contactForm.get('surname');
    }

    get ibanControl() {
        return this.contactForm.get('iban');
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        // sono in edit
        if (this.contactToEdit) {
            this.contactForm.patchValue(this.contactToEdit);
        }
    }

    submit() {
        if (this.contactForm.valid) {
            this.saveContact.emit(this.contactForm.value);
        }
    }
}
