import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Contact} from '../../../models/contact.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'fd-contact-list',
    template: `
        <div class="animate__animated animate__fadeIn">
            <div class="d-flex justify-content-center">
                <mat-form-field class="w-100" appearance="outline">
                    <mat-label>Cerca</mat-label>
                    <input matInput [formControl]="search" class="d-block">
                </mat-form-field>
            </div>
            <div class="d-flex border-bottom p-1"
                 *ngFor="let contact of contacts | filterContacts: ((query$ | async) || '') ">
                <div class="flex-grow-1">
                <span class="position-relative contact-name fst-italic">
                    {{contact.name}} {{contact.surname}}
                </span>
                </div>
                <i class="material-icons pointer" matTooltip="Seleziona" (click)="selectContact.emit(contact)">check</i>
                <i class="material-icons pointer ms-2 me-2" matTooltip="Modifica"
                   (click)="editContact.emit(contact)">edit</i>
                <i class="material-icons pointer" matTooltip="Elimina"
                   (click)="deleteContact.emit(contact)">delete_forever</i>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <button type="button" mat-raised-button color="primary" class="w-100" (click)="addNewContact.emit()">
                    Nuovo
                    contatto
                </button>
            </div>
        </div>
    `,
    styles: [`
        .contact-name {
            top: 5px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
    @Input() contacts: Contact[] = [];
    @Output() selectContact = new EventEmitter<Contact>();
    @Output() editContact = new EventEmitter<Contact>();
    @Output() deleteContact = new EventEmitter<Contact>();
    @Output() addNewContact = new EventEmitter();

    search = new FormControl('');
    query$!: Observable<string>;

    constructor() {
    }

    ngOnInit(): void {
        this.query$ = this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        );
    }
}
