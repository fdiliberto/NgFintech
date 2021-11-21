import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'fd-login',
    template: `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="col-md-4">
                <mat-card class="p-5 shadow animate__animated animate__flipInX">
                    <h1 class="text-center pb-4"><span class="fst-italic">NgFintech Login</span></h1>
                    <form [formGroup]="loginForm" (ngSubmit)="login()">
                        <mat-form-field appearance="fill" class="w-100 mb-3">
                            <mat-label>
                                <mat-icon>person</mat-icon>
                                Email
                            </mat-label>
                            <input formControlName="email" matInput>
                            <mat-error *ngIf="emailControl!.hasError('email') && !emailControl!.hasError('required')">
                                Insersci un indirizzo email valido
                            </mat-error>
                            <mat-error *ngIf="emailControl!.hasError('required')">
                                Inserisci la tua <strong>email</strong>
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field appearance="fill" class="w-100 mb-3">
                            <mat-label>
                                <mat-icon>key</mat-icon>
                                Password
                            </mat-label>
                            <input [type]="hide ? 'password' : 'text'" formControlName="password" matInput>
                            <mat-icon matSuffix (click)="hide = !hide">
                                {{hide ? 'visibility_off' : 'visibility'}}
                            </mat-icon>
                            <mat-error *ngIf="passwordControl!.hasError('required')">
                                Inserisci la tua <strong>password</strong>
                            </mat-error>
                        </mat-form-field>
                        <button mat-raised-button color="primary" class="w-100" [disabled]="!loginForm.valid">Accedi
                        </button>
                    </form>
                    <p class="mt-3 fst-italic"><a [routerLink]="['/register']">Crea nuovo account</a></p>
                </mat-card>
            </div>
        </div>
    `,
    styles: []
})
export class LoginComponent implements OnInit {
    /**
     * show or hide password input on form
     */
    hide = true;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    /**
     * Getters campi del form
     */
    get emailControl() {
        return this.loginForm.get('email');
    }

    get passwordControl() {
        return this.loginForm.get('password');
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    login() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
    }
}
