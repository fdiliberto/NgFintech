import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransferRoutingModule} from './transfer-routing.module';
import {TransferComponent} from './transfer.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactListComponent} from './contacts/contact-list.component';
import { ContactFormComponent } from './contacts/contact-form.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
    declarations: [
        TransferComponent,
        ContactListComponent,
        ContactFormComponent,
        ContactsComponent
    ],
    imports: [
        CommonModule,
        TransferRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ]
})
export class TransferModule {
}
