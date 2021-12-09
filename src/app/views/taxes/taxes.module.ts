import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxesRoutingModule} from './taxes-routing.module';
import {TaxesComponent} from './taxes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../shared/material.module';
import { ErarioComponent } from './erario/erario.component';
import { InpsComponent } from './inps/inps.component';

@NgModule({
    declarations: [
        TaxesComponent,
        ErarioComponent,
        InpsComponent
    ],
    imports: [
        CommonModule,
        TaxesRoutingModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TaxesModule {
}
