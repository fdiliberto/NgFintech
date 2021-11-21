import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovementsRoutingModule} from './movements-routing.module';
import {MovementsComponent} from './movements.component';
import {MovementComponent} from './movement/movement.component';
import {MaterialModule} from '../../shared/material.module';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        MovementsComponent,
        MovementComponent
    ],
    imports: [
        CommonModule,
        MovementsRoutingModule,
        MaterialModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class MovementsModule {
}
