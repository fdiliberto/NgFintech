import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DayWithSlot} from '../../../models/day-with-slot.model';

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
                <input matInput [matDatepicker]="picker" formControlName="date" [min]="today">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="dataControl!.hasError('required')">
                    Data <strong>richiesta</strong>
                </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="d-block mb-2">
                <mat-label>Orario</mat-label>
                <mat-select formControlName="slot">
                    <!--                    <mat-select-trigger>-->
                    <!--                        <mat-icon [inline]="true">access_time</mat-icon>-->
                    <!--                    </mat-select-trigger>-->
                    <mat-option *ngFor="let slot of 24 | time" [value]="slot">
                        {{slot < 10 ? '0' + slot : slot}}:00
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
export class ApointmentFormComponent implements OnInit {
    @Output() bookDay = new EventEmitter<DayWithSlot>();
    @Output() cancel = new EventEmitter<void>();

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

    ngOnInit(): void {
    }

    submit() {
        if (this.apointmentForm.valid) {
            const {date, slot} = this.apointmentForm.value;
            // TODO
            const d: DayWithSlot = {
                day: (date as Date).toLocaleDateString(),
                slot
            }
            console.log(d);
            this.bookDay.emit(d);
        }
    }

    cleanup() {
        this.apointmentForm.reset();
        this.apointmentForm.markAsPristine();
        this.apointmentForm.markAsUntouched();
        this.apointmentForm.updateValueAndValidity();
    }
}
