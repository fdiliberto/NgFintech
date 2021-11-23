import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
/**
 * LOCALIZZAZIONE
 */
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        // Valori di default per autenticazione con COOKIES:
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN',
        })
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'it-IT'
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EUR'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
