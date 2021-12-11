import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {Tax} from '../models/tax.model';

@Injectable({
    providedIn: 'root'
})
export class TaxesService {

    constructor(private http: HttpClient) {
    }

    payTaxes(tax: Tax) {
        return this.http.post<boolean>(`${env.apiUrl}/taxes`, tax);
    }
}
