import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Location} from '../models/location.model';
import {HttpClient} from '@angular/common/http';
import {DayWithSlots} from '../models/day-with-slots.model';
import {environment as env} from '../../environments/environment';
import {DayWithSlot} from '../models/day-with-slot.model';

@Injectable()
export class ApointmentsService implements OnDestroy {
    private _locations$ = new BehaviorSubject<Location[]>([]);
    private _slots$ = new BehaviorSubject<DayWithSlots[]>([]);
    private sub = new Subscription();

    constructor(private http: HttpClient) {
    }

    get locations$() {
        return this._locations$.asObservable();
    }

    get slots$() {
        return this._slots$.asObservable();
    }

    getLoctions() {
        this.http.get<Location[]>(`${env.apiUrl}/locations`)
            .subscribe(locations => this._locations$.next(locations));
    }

    getSlotsByLocationId(locationId: number) {
        this.http.get<DayWithSlots[]>(`${env.apiUrl}/slots/${locationId}`)
            .subscribe(slots => this._slots$.next(slots));
    }

    bookApointment(apointment: DayWithSlot) {
        return this.http.post<boolean>(`${env.apiUrl}/schedule`, apointment);
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
