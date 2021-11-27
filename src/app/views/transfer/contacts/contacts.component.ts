import {Component, Inject, OnInit} from '@angular/core';
import {Contact} from '../../../models/contact.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from '../../../api/contacts.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {delay, tap} from 'rxjs/operators';


@Component({
    selector: 'fd-contacts',
    template: `
        <ng-container *ngIf="!showContactForm">
            <fd-contact-list
                    [contacts]="data"
                    (addNewContact)="showContactForm = true"
                    (deleteContact)="deleteContactHandler($event)"
                    (editContact)="editContactHandler($event)"
                    (selectContact)="selectContactHandler($event)">
            </fd-contact-list>
        </ng-container>
        <ng-container *ngIf="showContactForm">
            <fd-contact-form
                    [contactToEdit]="contactToEdit"
                    (back)="backHandler()"
                    (saveContact)="upInsertContactHandler($event)">
            </fd-contact-form>
        </ng-container>
    `,
    styles: []
})
export class ContactsComponent implements OnInit {
    contactToEdit: Contact | null = null;
    showContactForm = false;

    constructor(private dialogRef: MatDialogRef<ContactsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Contact[],
                private contactsService: ContactsService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    backHandler() {
        this.showContactForm = false;
        this.contactToEdit = null;
    }

    deleteContactHandler(contact: Contact) {
        const c = contact;
        this.contactsService.deleteContact(contact._id).subscribe(success => {
            if (success) {
                this.data = this.data.filter(f => f._id !== c._id);
                this.snackBar.open('Contatto rimosso con successo', undefined, {duration: 2000});
            }
        })
    }

    selectContactHandler(contact: Contact) {
        this.dialogRef.close(contact);
    }

    editContactHandler(contact: Contact) {
        this.contactToEdit = contact;
        this.showContactForm = true;
    }

    upInsertContactHandler(contact: Partial<Contact>) {
        const upInsert$ = this.contactToEdit
            ? this.contactsService.updateContact({...this.contactToEdit, ...contact})
            : this.contactsService.createContact(contact);

        const msg = this.showContactForm
            ? 'Contatto aggiornato con successo'
            : 'Contatto creato con successo';

        upInsert$.pipe(
            delay(1000),
            tap(contact => {
                this.snackBar.open(msg, undefined, {duration: 2000});
                return contact;
            })
        ).subscribe(contact => {
            this.dialogRef.close(contact)
        });
    }
}
