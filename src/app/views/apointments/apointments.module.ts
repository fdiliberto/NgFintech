import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApointmentsRoutingModule} from './apointments-routing.module';
import {ApointmentsComponent} from './apointments.component';
import {MaterialModule} from '../../shared/material.module';
import {SharedModule} from '../../shared/shared.module';
import {ApointmentFormComponent} from './apointment-form/apointment-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ApointmentsComponent,
        ApointmentFormComponent
    ],
    imports: [
        CommonModule,
        ApointmentsRoutingModule,
        MaterialModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class ApointmentsModule {
}
