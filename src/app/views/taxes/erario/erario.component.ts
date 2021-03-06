import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {Erario} from '../../../models/tax.model';

@Component({
    selector: 'fd-erario',
    template: `
        <form [formGroup]="erarioForm">
            <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                <mat-label>Codice Tributo</mat-label>
                <input formControlName="codiceTributo" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                <mat-label>Anno riferimento</mat-label>
                <input formControlName="annoRif" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                <mat-label>Importo debito</mat-label>
                <input type="number" formControlName="importoDebito" matInput>
            </mat-form-field>
            <mat-form-field appearance="fill" class="col-md-5 mb-2">
                <mat-label>Importo credito</mat-label>
                <input type="number" formControlName="importoCredito" matInput>
            </mat-form-field>
            <div class="mat-form-field">
                <mat-icon class="text-danger pointer" (click)="cancel.emit()">delete</mat-icon>
            </div>
        </form>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ErarioComponent,
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErarioComponent implements ControlValueAccessor, OnInit {
    @Output() cancel = new EventEmitter<void>();

    erarioForm = this.fb.group({
        codiceTributo: [''],
        annoRif: [''],
        importoDebito: [0],
        importoCredito: [0]
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.erarioForm.valueChanges.subscribe(erario => {
            this.onChange(erario as Erario);
            this.onTouched();
        })
    }

    // Control Value Accessor
    onChange = (value: Erario) => {
    };

    onTouched = () => {
    };

    writeValue(erario: Erario): void {
        this.erarioForm.patchValue(erario);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
