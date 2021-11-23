import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Card} from '../models/card.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CardsService {
    private _cards$ = new BehaviorSubject<Card[]>([])

    get cards() {
        return this._cards$.asObservable();
    }

    constructor(private http: HttpClient) {
    }
}
