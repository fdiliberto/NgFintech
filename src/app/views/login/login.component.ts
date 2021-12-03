import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthCookiesService} from '../../core/auth/services/auth-cookies.service';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY, of, Subject, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {User} from '../../core/auth/models/user.model';

@Component({
    selector: 'fd-login',
    template: `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="col-md-4">
                <mat-card class="p-5 shadow animate__animated animate__flipInX">
                    <h1 class="text-center pb-4"><span class="fst-italic">NgFintech Login</span></h1>
                    <form [formGroup]="loginForm" (ngSubmit)="login$.next()">
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
    /**
     * show or hide password input on form
     */
    hide = true;

    login$ = new Subject();
    loginSub = new Subscription();

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

    constructor(private fb: FormBuilder,
                private authService: AuthCookiesService,
                private snackBar: MatSnackBar,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loginSub = this.login$.pipe(
            map(() => {
                if (this.loginForm.valid) {
                    const {email, password} = this.loginForm.value as { email: string, password: string };
                    return {email, password};
                }
                return EMPTY;
            }),
            exhaustMap((credentials) => {
                const cred = credentials as { email: string, password: string };
                return this.authService.login(cred.email, cred.password).pipe(
                    catchError(error => {
                        if (error instanceof HttpErrorResponse && error.status === 401) {
                            return of({error: 'Utente non autorizzato'})
                        }
                        return of({
                            error: 'Si sono verificati errori. Contatta il supporto'
                        });
                    })
                )
            }),
        ).subscribe((result: User | { error: string }) => {
            const errorMsg = result as { error: string };
            if (errorMsg.error !== undefined) {
                this.snackBar.open((result as { error: string }).error, undefined, {duration: 2000});
            } else {
                this.snackBar.open(`Benvenuto/a ${(result as User).displayName}`, undefined, {duration: 2000});
                this.router.navigate(['/dashboard']);
            }
        });
    }

    ngOnDestroy(): void {
        this.loginSub.unsubscribe();
    }
}
