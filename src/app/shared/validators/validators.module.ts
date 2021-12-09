import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequiredLengthValidatorDirective} from './requiredLength.validator';
import {EqualFieldValidatorDirective} from './equalFieldsValidator.validator';

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
