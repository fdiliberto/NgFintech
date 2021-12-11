import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {requiredLengthValidator} from '../../shared/validators/required-length.validator';
import {TaxesService} from '../../api/taxes.service';
import {Tax} from '../../models/tax.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'fd-taxes',
    template: `
        <fd-intro-page description="In questa pagina potrai effettuare il pagamento delle tasse."></fd-intro-page>
        <mat-card class="col-auto m-2 animate__animated animate__fadeIn">
            <div class="row">
                <form [formGroup]="taxesForm" (ngSubmit)="submit()">
                    <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                        <mat-label>Nome</mat-label>
                        <input formControlName="nome" matInput>
                        <mat-error *ngIf="nomeControl!.hasError('required')">
                            Nome <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 mb-2">
                        <mat-label>Cognome</mat-label>
                        <input formControlName="cognome" matInput>
                        <mat-error *ngIf="cognomeControl!.hasError('required')">
                            Cognome <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                        <mat-label>Sesso</mat-label>
                        <mat-select formControlName="sesso">
                            <mat-option [value]="'M'">
                                Uomo
                            </mat-option>
                            <mat-option [value]="'F'">
                                Donna
                            </mat-option>
                        </mat-select>
                        <mat-error *ngIf="sessoControl!.hasError('required')">
                            Sesso <strong>richiesto</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 mb-2">
                        <mat-label>Data di nascita</mat-label>
                        <input matInput [matDatepicker]="picker" formControlName="dataNascita" [max]="today">
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                        <mat-error *ngIf="dataNascitaControl!.hasError('required')">
                            Data di nascita <strong>richiesta</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                        <mat-label>Città di nascita</mat-label>
                        <input formControlName="cittaNascita" matInput>
                        <mat-error *ngIf="cittaNascitaControl!.hasError('required')">
                            Città di nascita <strong>richiesta</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 me-2 mb-2">
                        <mat-label>Provincia di nascita</mat-label>
                        <input formControlName="provinciaNascita" matInput>
                        <mat-error *ngIf="provinciaNascitaControl!.hasError('required')">
                            Provincia di nascita <strong>richiesta</strong>
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="col-md-5 mb-2">
                        <mat-label>Codice Fiscale</mat-label>
                        <input formControlName="codiceFiscale" matInput>
                        <mat-error *ngIf="codiceFiscaleControl!.hasError('required')">
                            Codice Fiscale <strong>richiesto</strong>
                        </mat-error>
                        <mat-error
                                *ngIf="!codiceFiscaleControl!.hasError('required') &&  codiceFiscaleControl!.errors?.requiredLength">
                            Il Codice Fiscale deve essere di <strong>16 caratteri</strong>
                        </mat-error>
                    </mat-form-field>
                    <!-- ERARIO -->
                    <div class="mat-form-field col-md-12 mb-4">
                        <h2 class="fw-bold">Erario</h2>
                        <button type="button" mat-fab color="warn" aria-label="Aggiungi erario"
                                (click)="addErarioOrInps(false)">
                            <mat-icon>add</mat-icon>
                        </button>
                    </div>
                    <ng-container formArrayName="erarioList">
                        <ng-container *ngFor="let e of erarioListControl.controls; let i = index">
                            <fd-erario [formControlName]="i" (cancel)="deleteErarioOrInps(false, i)"></fd-erario>
                        </ng-container>
                    </ng-container>
                    <!-- INPS -->
                    <div class="mat-form-field col-md-12 mb-2">
                        <h2 class="fw-bold">Inps</h2>
                        <button type="button" mat-fab color="warn" aria-label="Aggiungi inps"
                                (click)="addErarioOrInps(true)">
                            <mat-icon>add</mat-icon>
                        </button>
                    </div>
                    <ng-container formArrayName="inpsList">
                        <ng-container *ngFor="let e of inpsListControl.controls; let i = index">
                            <fd-inps [formControlName]="i" (cancel)="deleteErarioOrInps(true, i)"></fd-inps>
                        </ng-container>
                    </ng-container>
                    <div class="mat-form-field col-md-5 offset-3  mt-3">
                        <button mat-raised-button color="primary" class="w-100">
                            Effettua
                            pagamento
                        </button>
                    </div>
                </form>
            </div>
        </mat-card>
        <!--        <pre>{{taxesForm.status | json}}</pre>-->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxesComponent {
    taxesForm = this.fb.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        sesso: ['', Validators.required],
        dataNascita: ['', Validators.required],
        cittaNascita: ['', Validators.required],
        provinciaNascita: ['', Validators.required],
        codiceFiscale: ['', [Validators.required, requiredLengthValidator(16)]],
        erarioList: this.fb.array([], Validators.required),
        inpsList: this.fb.array([], Validators.required),
    });

    today = new Date();

    get nomeControl() {
        return this.taxesForm.get('nome');
    }

    get cognomeControl() {
        return this.taxesForm.get('cognome');
    }

    get sessoControl() {
        return this.taxesForm.get('sesso');
    }

    get dataNascitaControl() {
        return this.taxesForm.get('dataNascita');
    }

    get cittaNascitaControl() {
        return this.taxesForm.get('cittaNascita');
    }

    get provinciaNascitaControl() {
        return this.taxesForm.get('provinciaNascita');
    }

    get codiceFiscaleControl() {
        return this.taxesForm.get('codiceFiscale');
    }

    get erarioListControl() {
        return this.taxesForm.get('erarioList') as FormArray;
    }

    get inpsListControl() {
        return this.taxesForm.get('inpsList') as FormArray;
    }

    constructor(private fb: FormBuilder, private taxesService: TaxesService, private snackBar: MatSnackBar) {
    }

    addErarioOrInps(isInps: boolean) {
        if (isInps) {
            this.inpsListControl.push(this.fb.control([]));
        } else {
            this.erarioListControl.push(this.fb.control([]));
        }
    }

    submit() {
        if (this.taxesForm.valid) {
            const tax = this.taxesForm.value as Tax;
            this.taxesService.payTaxes(tax).subscribe(result => {
                const msg = result ? 'Pagamento effettuato con successo' : 'Si sono verificati errori. Riprova più tardi.';
                this.snackBar.open(msg, undefined, {duration: 2000});
            });
        }
    }

    deleteErarioOrInps(isInps: boolean, index: number) {
        if (isInps) {
            this.inpsListControl.removeAt(index);
        } else {
            this.erarioListControl.removeAt(index);
        }
    }
}
