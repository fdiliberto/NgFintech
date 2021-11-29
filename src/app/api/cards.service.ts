import {Injectable} from '@angular/core';
import {Card} from '../models/card.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {Movement} from '../models/movements.model';
import {CardCreate} from '../models/card-create.model';

@Injectable({
    providedIn: 'root'
})
export class CardsService {
    constructor(private http: HttpClient) {
    }

    getCards() {
        return this.http.get<Card[]>(`${env.apiUrl}/cards`);
    }

    createCard(cardForm: CardCreate) {
        return this.http.post<Card>(`${env.apiUrl}/cards`, cardForm);
    }

    deleteCard(cardId: string) {
        return this.http.delete<boolean>(`${env.apiUrl}/cards/${cardId}`);
    }

    getCardMovs(cardId: string, limit: number = 10, offset: number = 1) {
        const params = new HttpParams()
            .set('limit', limit)
            .set('offset', offset);
        return this.http.get<{ data: Movement[], total: number }>(`${env.apiUrl}/cards/${cardId}/movements`, {params})
    }
}
