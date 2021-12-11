import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './components/welcome.component';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {TruncatePipe} from './pipes/truncate.pipe';
import {IntroPageComponent} from './components/intro-page.component';
import {FilterContactsPipe} from './pipes/filter-contacts.pipe';
import {TimePipe} from './pipes/time.pipe';
import {LeafletMapComponent} from './components/leaflet-map/leaflet-map.component';
import {TimeStringPipe} from './pipes/time-string.pipe';
import {NoDataFoundComponent} from './components/no-data-found.component';
import {ButtonPaginationComponent} from './components/button-pagination.component';

const COMPONENTS = [WelcomeComponent, IntroPageComponent, LeafletMapComponent, NoDataFoundComponent, ButtonPaginationComponent];
const PIPES = [TruncatePipe, FilterContactsPipe, TimePipe, TimeStringPipe]

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PIPES
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [...COMPONENTS, ...PIPES]
})
export class SharedModule {
}
