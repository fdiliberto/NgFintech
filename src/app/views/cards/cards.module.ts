import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsRoutingModule} from './cards-routing.module';
import {CardsComponent} from './cards.component';
import {CardListComponent} from './card-list/card-list.component';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CardFormComponent} from './card-form/card-form.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [
        CardsComponent,
        CardListComponent,
        CardFormComponent
    ],
    imports: [
        CommonModule,
        CardsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class CardsModule {
}
