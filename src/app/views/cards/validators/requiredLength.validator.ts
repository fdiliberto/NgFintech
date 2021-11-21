import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function requiredLengthValidator(len: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control?.value?.length === len ? null : {requiredLength: true};
    };
}
