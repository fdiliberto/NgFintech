import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequiredLengthValidatorDirective} from './required-length.validator';
import {EqualFieldValidatorDirective} from './equal-fields.validator';

const VALIDATORS = [RequiredLengthValidatorDirective, EqualFieldValidatorDirective];

@NgModule({
    declarations: [...VALIDATORS],
    imports: [
        CommonModule
    ],
    exports: [...VALIDATORS]
})
export class ValidatorsModule {
}
