import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../shared/material.module';
import {NavbarComponent} from './components/navbar.component';
import {RouterModule} from '@angular/router';

const COMPONENTS = [NavbarComponent]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [...COMPONENTS]
})
export class CoreModule {
}
