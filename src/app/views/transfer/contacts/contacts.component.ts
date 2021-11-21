import {Component, Inject, OnInit} from '@angular/core';
import {Contact} from '../../../models/contact.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'fd-contacts',
    template: `
        <ng-container *ngIf="!addOrUpdateContact">
            <fd-contact-list
                    [contacts]="data"
                    (addNewContact)="addOrUpdateContact = true"
                    (deleteContact)="deleteContactHandler($event)"
                    (editContact)="editContactHandler($event)"
                    (selectContact)="selectContactHandler($event)">
            </fd-contact-list>
        </ng-container>
        <ng-container *ngIf="addOrUpdateContact">
            <fd-contact-form
                    [contactToEdit]="contactToEdit"
                    (back)="backHandler()"
                    (saveContact)="saveContactHandler($event)">
            </fd-contact-form>
        </ng-container>
    `,
    styles: []
})
export class ContactsComponent implements OnInit {
    contactToEdit: Contact | null = null;
    addOrUpdateContact = false;

    constructor(private dialogRef: MatDialogRef<ContactsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Contact[]) {
    }

    ngOnInit(): void {
    }

    backHandler() {
        this.addOrUpdateContact = false;
        this.contactToEdit = null;
    }

    deleteContactHandler(contact: Contact) {
        console.log('delete contact', contact);
    }

    selectContactHandler(contact: Contact) {
        console.log('select contact', contact);
        this.dialogRef.close(contact);
    }

    editContactHandler(contact: Contact) {
        this.contactToEdit = contact;
        this.addOrUpdateContact = true;
        console.log('edit contact', contact);
    }

    saveContactHandler(contact: Omit<Contact, "_id">) {
        console.log('save contact', contact);

        // TODO chiamata a servizio per salvare contatto
        setTimeout(() => {
            this.dialogRef.close(contact);
        }, 3000)
    }
}
