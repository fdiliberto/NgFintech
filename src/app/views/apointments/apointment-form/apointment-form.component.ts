import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DayWithSlot} from '../../../models/day-with-slot.model';
import {DateFilterFn, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DayWithSlots} from '../../../models/day-with-slots.model';
import {dateToString} from '../../../shared/utils/date.utils';
import {from, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'fd-apointment-form',
    template: `
        <h1 class="text-center pb-4"><span class="fst-italic">Prenota appuntamento</span></h1>
        <div class="w-100">
            <ng-content></ng-content>
        </div>
        <form [formGroup]="apointmentForm" (ngSubmit)="submit()">
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Choose a date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="date" [min]="today"
                       [matDatepickerFilter]="filterAvailability" (dateChange)="changeDateHandler($event)">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="dataControl!.hasError('required')">
                    Data <strong>richiesta</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Orario</mat-label>
                <mat-select formControlName="slot">
                    <mat-option *ngFor="let t of time$ | async" [value]="t">
                        {{t | timeString}}
                    </mat-option>
                </mat-select>
                <mat-error *ngIf="slotControl!.hasError('required')">
                    Orario <strong>richiesto</strong>
                </mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" class="w-100 mt-2" [disabled]="!apointmentForm.valid">
                Conferma
            </button>
            <button type="button" mat-raised-button class="w-100 mt-1"
                    (click)="cleanup(); cancel.emit();">
                Annulla
            </button>
        </form>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApointmentFormComponent {
    @Input() availability: DayWithSlots[] | null = [];
    @Output() bookDay = new EventEmitter<DayWithSlot>();
    @Output() cancel = new EventEmitter<void>();

    time$: Observable<Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24>> | null = null;

    apointmentForm = this.fb.group({
        date: ['', Validators.required],
        slot: ['', Validators.required]
    })

    today = new Date();

    get dataControl() {
        return this.apointmentForm.get('date');
    }

    get slotControl() {
        return this.apointmentForm.get('slot');
    }

    constructor(private fb: FormBuilder) {
    }

    submit() {
        if (this.apointmentForm.valid) {
            const {date, slot} = this.apointmentForm.value;
            const d: DayWithSlot = {
                day: (date as Date).toLocaleDateString(),
                slot
            }
            this.bookDay.emit(d);
        }
    }

    cleanup() {
        this.apointmentForm.reset();
        this.apointmentForm.markAsPristine();
        this.apointmentForm.markAsUntouched();
        this.apointmentForm.updateValueAndValidity();
    }

    filterAvailability: DateFilterFn<Date | null> = (date: Date | null) => {
        if (date && this.availability?.length) {
            const currentDate = dateToString(date);
            return this.availability.findIndex(i => i.day === currentDate) > -1;
        }
        return true;
    };

    changeDateHandler(dataEvent: MatDatepickerInputEvent<Date, Date | null>) {
        if (dataEvent && dataEvent.value && this.availability) {
            this.time$ = from(this.availability).pipe(
                filter(f => f.day === dateToString(dataEvent.value as Date)),
                map(m => m.slots)
            )
        }
    }
}
