import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

export function amountValidator(control: AbstractControl): ValidationErrors | null {
    const val = control?.value;

    if (isNaN(val)) {
        return {amount: 'Il valore immesso non è numerico'}
    }

    if ((val as number) <= 0) {
        return {amount: 'Il valore immesso deve essere maggiore di zero'}
    }

    return null;
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
    selector: '[amountValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: AmountValidatorDirective, multi: true}]
})
export class AmountValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return amountValidator(control);
    }
}


