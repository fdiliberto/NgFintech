import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transfer} from '../models/transfer.model';
import {environment as env} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransferService {

    constructor(private http: HttpClient) {
    }

    createTransfer(transfer: Transfer) {
        return this.http.post<boolean>(`${env.apiUrl}/transfer`, transfer);
    }
}
