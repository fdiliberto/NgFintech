import {Injectable} from '@angular/core';
import {Location} from '../models/location.model';
import {HttpClient} from '@angular/common/http';
import {DayWithSlots} from '../models/day-with-slots.model';
import {environment as env} from '../../environments/environment';
import {DayWithSlot} from '../models/day-with-slot.model';

@Injectable({
    providedIn: 'root'
})
export class ApointmentsService {
    constructor(private http: HttpClient) {
    }

    getLoctions() {
        return this.http.get<Location[]>(`${env.apiUrl}/locations`);
    }

    getSlotsByLocationId(locationId: number) {
        return this.http.get<DayWithSlots[]>(`${env.apiUrl}/slots/${locationId}`);
    }

    bookApointment(apointment: DayWithSlot) {
        return this.http.post<boolean>(`${env.apiUrl}/schedule`, apointment);
    }
}
