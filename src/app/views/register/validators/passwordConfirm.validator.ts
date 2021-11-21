import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordConfirmValidator(): ValidatorFn {
    return (passwordsControls: AbstractControl): ValidationErrors | null => {
        const passwords = passwordsControls as FormGroup
        return passwords.get('password')?.value !== passwords.get('repeatPassword')?.value
            ? {passwordConfirm: 'Le password non coincidono'}
            : null;
    };
}
