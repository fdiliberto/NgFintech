import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../models/location.model';
import {LeafletOptions} from '../../shared/components/leaflet-map/leaflet-options.model';
import {ApointmentsService} from '../../api/apointments.service';
import {MatDrawer} from '@angular/material/sidenav';
import {MatSelectionList} from '@angular/material/list';
import {skip} from 'rxjs/operators';

@Component({
    selector: 'fd-apointments',
    template: `
        <mat-drawer-container class="bg-transparent">
            <mat-drawer #drawer mode="over" position="end" class="position-fixed overflow-auto w-25"
                        [disableClose]="true">
                <div class="m-3">
                    <!-- workaround con if per evitare che il form rimanga validato e mostri gli errori -->
                    <fd-apointment-form
                            *ngIf="drawer.opened"
                            (cancel)="cancelApointmentHandler()">
                        <fd-leaflet-map
                                *ngIf="locationSelected"
                                [position]="getPosition()"
                                [height]="400"
                                [zoom]="12">
                        </fd-leaflet-map>
                    </fd-apointment-form>
                </div>
            </mat-drawer>
            <mat-drawer-content [ngClass]="{'vh-100': drawer.opened}">
                <fd-intro-page
                        description="In questa pagina potrai fissare un appuntamento con la tua banca.">
                </fd-intro-page>
                <mat-card class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
                    <mat-selection-list #locationsList [multiple]="false">
                        <mat-list-option *ngFor="let loc of apointmentsService.locations$ | async" [value]="loc._id"
                                         (click)="changeLocationHandler(loc)">
                            <mat-icon matListIcon>business</mat-icon>
                            <h3 matLine class="fw-bold">{{loc.name}} </h3>
                            <p matLine>
                                <small class="fst-italic">
                                    <mat-icon [inline]="true">location_on</mat-icon>
                                    {{loc.address}} </small>
                            </p>
                        </mat-list-option>
                    </mat-selection-list>
                </mat-card>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    providers: [ApointmentsService]
})
export class ApointmentsComponent implements OnInit {
    @ViewChild('drawer', {static: true}) drawer!: MatDrawer;
    @ViewChild('locationsList', {static: true}) locationsList!: MatSelectionList;

    locationSelected: Location | null = null;

    constructor(public apointmentsService: ApointmentsService) {
    }

    ngOnInit(): void {
        this.apointmentsService.getLoctions();
        this.apointmentsService.slots$.pipe(
            skip(1)
        ).subscribe(slots => {
            this.drawer.open();
            console.log(slots);
        });
    }

    getPosition() {
        if (this.locationSelected) {
            return {
                latLng: [this.locationSelected?.coords[0], this.locationSelected?.coords[1]],
                markerText: this.locationSelected.address
            } as LeafletOptions
        }
        return null;
    }

    changeLocationHandler(loc: Location) {
        this.locationSelected = loc;
        this.apointmentsService.getSlotsByLocationId(+loc._id);
    }

    cancelApointmentHandler() {
        this.locationsList.deselectAll();
        this.drawer.close();
    }
}
