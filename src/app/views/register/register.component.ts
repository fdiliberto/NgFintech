import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordConfirmValidator} from './validators/passwordConfirm.validator';

@Component({
    selector: 'fd-register',
    template: `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="col-md-4">
                <mat-card class="p-5 shadow animate__animated animate__flipInY">
                    <h1 class="text-center pb-4"><span class="fst-italic">Registrazione</span></h1>
                    <form [formGroup]="registerForm" (ngSubmit)="register()">
                        <mat-form-field appearance="fill" class="w-100 mb-3">
                            <mat-label>Email</mat-label>
                            <input formControlName="email" matInput>
                            <mat-error *ngIf="emailControl!.hasError('email') && !emailControl!.hasError('required')">
                                Insersci un indirizzo email valido
                            </mat-error>
                            <mat-error *ngIf="emailControl!.hasError('required')">
                                Email <strong>richiesta</strong>
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="fill" class="w-100 mb-3">
                            <mat-label>Nome</mat-label>
                            <input formControlName="name" matInput>
                            <mat-error *ngIf="nameControl!.hasError('required')">
                                Nome <strong>richiesto</strong>
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="fill" class="w-100 mb-3">
                            <mat-label>Cognome</mat-label>
                            <input formControlName="surname" matInput>
                            <mat-error *ngIf="surnameControl!.hasError('required')">
                                Cognome <strong>richiesto</strong>
                            </mat-error>
                        </mat-form-field>
                        <ng-container formGroupName="passwords">
                            <mat-form-field appearance="fill" class="w-100 mb-3">
                                <mat-label>Password</mat-label>
                                <input [type]="hide ? 'password' : 'text'" formControlName="password" matInput>
                                <mat-icon matSuffix (click)="hide = !hide">
                                    {{hide ? 'visibility_off' : 'visibility'}}
                                </mat-icon>
                                <mat-error *ngIf="passwordControl!.hasError('required')">
                                    Password <strong>richiesta</strong>
                                </mat-error>
                            </mat-form-field>
                            <mat-form-field appearance="fill" class="w-100 mb-3">
                                <mat-label>Ripeti la password</mat-label>
                                <input [type]="hideRepeatPsw ? 'password' : 'text'" formControlName="repeatPassword"
                                       matInput>
                                <mat-icon matSuffix (click)="hideRepeatPsw = !hideRepeatPsw">
                                    {{hideRepeatPsw ? 'visibility_off' : 'visibility'}}
                                </mat-icon>
                                <mat-error *ngIf="repeatPasswordControl!.hasError('required')">
                                    Ripetizione password <strong>richiesta</strong>
                                </mat-error>
                                <span class="passwordConfirmError text-danger"
                                      *ngIf="!repeatPasswordControl!.hasError('required') && passwordsGroup.errors?.passwordConfirm">
                                        <mat-icon [inline]="true">warning_amber</mat-icon>
                                    {{passwordsGroup.errors?.passwordConfirm}}
                                </span>
                            </mat-form-field>
                        </ng-container>
                        <button mat-raised-button color="primary" class="w-100" [disabled]="!registerForm.valid">
                            Registrati
                        </button>
                    </form>
                    <p class="mt-3 fst-italic"><a [routerLink]="['/login']">Hai già un account? Accedi</a></p>
                </mat-card>
            </div>
        </div>
    `,
    styles: [`
        .passwordConfirmError {
            position: absolute;
            left: 0;
            top: 34px;
            color: #ff5722;
            font-size: 75%;
        }

        .passwordConfirmError mat-icon {
            position: relative;
            top: 0.16em;
        }
    `]
})
export class RegisterComponent implements OnInit {
    /**
     * show or hide password input on form
     */
    hide = true;
    hideRepeatPsw = true;

    registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        passwords: this.fb.group({
                password: ['', Validators.required],
                repeatPassword: ['', [Validators.required]]
            },
            {validators: passwordConfirmValidator()})
    })

    /**
     * Getters campi del form
     */
    get emailControl() {
        return this.registerForm.get('email');
    }

    get nameControl() {
        return this.registerForm.get('name');
    }

    get surnameControl() {
        return this.registerForm.get('surname');
    }

    get passwordControl() {
        return this.passwordsGroup.get('password');
    }

    get passwordsGroup() {
        return this.registerForm.get('passwords') as FormGroup;
    }

    get repeatPasswordControl() {
        return this.registerForm.get('passwords.repeatPassword');
    }

    ngOnInit(): void {
    }

    constructor(private fb: FormBuilder) {
    }

    register() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        }
    }
}
