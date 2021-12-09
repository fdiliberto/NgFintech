import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Inps} from '../../../models/tax.model';

@Component({
    selector: 'fd-inps',
    template: `
        <form [formGroup]="inpsForm">
            <mat-form-field appearance="fill" class="col-md-2 mb-2">
                <mat-label>Codice Sede</mat-label>
                <input formControlName="codiceSede" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-2 ms-2 mb-2">
                <mat-label>Causale Contributo</mat-label>
                <input formControlName="causaleContributo" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-2 ms-2 mb-2">
                <mat-label>Codice Inps</mat-label>
                <input type="number" formControlName="codiceInps" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-2 ms-2 mb-2">
                <mat-label>Da</mat-label>
                <input matInput [matDatepicker]="pickerDa" formControlName="dataDa">
                <mat-datepicker-toggle matSuffix [for]="pickerDa"></mat-datepicker-toggle>
                <mat-datepicker #pickerDa></mat-datepicker>
            </mat-form-field>
            <div class="row">
                <mat-form-field appearance="fill" class="col-md-2">
                    <mat-label>A</mat-label>
                    <input matInput [matDatepicker]="pickerA" formControlName="dataA">
                    <mat-datepicker-toggle matSuffix [for]="pickerA"></mat-datepicker-toggle>
                    <mat-datepicker #pickerA></mat-datepicker>
                </mat-form-field>
                <mat-form-field appearance="fill" class="col-md-2">
                    <mat-label>Debito</mat-label>
                    <input type="number" formControlName="debito" matInput>
                </mat-form-field>
                <mat-form-field appearance="fill" class="col-md-2">
                    <mat-label>Credito</mat-label>
                    <input type="number" formControlName="credito" matInput>
                </mat-form-field>
            </div>

        </form>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InpsComponent,
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InpsComponent implements ControlValueAccessor, OnInit {
    inpsForm = this.fb.group({
        codiceSede: [''],
        causaleContributo: [''],
        codiceInps: [''],
        dataDa: [''],
        dataA: [''],
        debito: [''],
        credito: ['']
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    // Control Value Accessor
    onChange = (value: Inps) => {
    };

    onTouched = () => {
    };

    writeValue(inps: Inps): void {
        this.inpsForm.patchValue(inps);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
