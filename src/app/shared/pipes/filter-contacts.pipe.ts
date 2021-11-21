import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from '../../models/contact.model';

@Pipe({
    name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {
    transform(contacts: Contact[], query: string): Contact[] {
        return query
            ? contacts.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) ||
                f.surname.toLowerCase().includes(query.toLowerCase()))
            : contacts;
    }
}
