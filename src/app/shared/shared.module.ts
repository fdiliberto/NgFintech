import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar.component';
import {WelcomeComponent} from './components/welcome.component';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {TruncatePipe} from './pipes/truncate.pipe';
import {IntroPageComponent} from './components/intro-page.component';
import {FilterContactsPipe} from './pipes/filter-contacts.pipe';
import {TimePipe} from './pipes/time.pipe';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';

const COMPONENTS = [NavbarComponent, WelcomeComponent, IntroPageComponent];
const PIPES = [TruncatePipe, FilterContactsPipe, TimePipe]

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PIPES,
        LeafletMapComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [...COMPONENTS, ...PIPES, LeafletMapComponent]
})
export class SharedModule {
}
