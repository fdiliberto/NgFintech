import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../models/contact.model';
import {environment as env} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    constructor(private http: HttpClient) {
    }

    getContacts() {
        return this.http.get<Contact[]>(`${env.apiUrl}/contacts`);
    }

    createContact(contact: Partial<Contact>) {
        return this.http.post<Contact>(`${env.apiUrl}/contacts`, contact);
    }

    updateContact(contact: Contact) {
        return this.http.put<Contact>(`${env.apiUrl}/contacts/${contact._id}`, contact);
    }

    deleteContact(contactId: string) {
        return this.http.delete<boolean>(`${env.apiUrl}/contacts/${contactId}`);
    }
}
