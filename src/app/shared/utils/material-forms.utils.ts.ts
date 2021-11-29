import {FormGroup} from '@angular/forms';

/**
 * reset Angular Material Form
 * @param form
 */
export const formReset = (form: FormGroup) => {
    form.reset();
    Object.keys(form.controls).forEach(key => {
        form?.get(key)?.setErrors(null);
    });
}
