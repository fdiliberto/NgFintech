import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequiredLengthValidatorDirective} from './requiredLength.validator';

const VALIDATORS = [RequiredLengthValidatorDirective];

@NgModule({
    declarations: [...VALIDATORS],
    imports: [
        CommonModule
    ],
    exports: [...VALIDATORS]
})
export class ValidatorsModule {
}
