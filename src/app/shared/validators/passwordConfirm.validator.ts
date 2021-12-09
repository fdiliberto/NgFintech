import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, Input} from '@angular/core';

export function equalFieldsValidator(firstControlName: string, secondControlName: string): ValidatorFn {
    return (passwordsControls: AbstractControl): ValidationErrors | null => {
        const passwords = passwordsControls as FormGroup
        return passwords.get(firstControlName)?.value !== passwords.get(secondControlName)?.value
            ? {passwordConfirm: 'I campi non coincidono'}
            : null;
    };
}

@Directive({
    selector: '[equalFieldsValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: EqualFieldValidatorDirective, multi: true}]
})
export class EqualFieldValidatorDirective implements Validator {
    @Input() firstControlName: string = '';
    @Input() secondControlName: string = '';

    validate(control: AbstractControl): ValidationErrors | null {
        return equalFieldsValidator(this.firstControlName, this.secondControlName);
    }
}
