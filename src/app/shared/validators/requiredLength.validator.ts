import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive} from '@angular/core';

// funzione (Reactive Forms)
export function requiredLengthValidator(len: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control?.value?.length === len ? null : {requiredLength: true};
    };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
    selector: '[requiredLengthValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: RequiredLengthValidatorDirective, multi: true}]
})
export class RequiredLengthValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return requiredLengthValidator(control.value as number);
    }
}


