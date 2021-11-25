import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../models/location.model';
import {LeafletOptions} from '../../shared/components/leaflet-map/leaflet-options.model';
import {MatDrawer} from '@angular/material/sidenav';
import {MatSelectionList} from '@angular/material/list';
import {filter, map, switchMap, switchMapTo} from 'rxjs/operators';
import {DayWithSlots} from '../../models/day-with-slots.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {DayWithSlot} from '../../models/day-with-slot.model';
import {MatDialog} from '@angular/material/dialog';
import {ApointmentConfirmDialogComponent} from './apointment-form/apointment-confirm-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApointmentsService} from '../../api/apointments.service';

@Component({
    selector: 'fd-apointments',
    template: `
        <mat-drawer-container class="bg-transparent">
            <mat-drawer #drawer mode="over" position="end" class="position-fixed overflow-auto w-25"
                        [disableClose]="true">
                <div class="m-3">
                    <!-- workaround con if per evitare che il form rimanga validato e mostri gli errori -->
                    <ng-container *ngIf="appointment$ | async as apt">
                        <fd-apointment-form *ngIf="apt.slots.length"
                                            [availability]="apt.slots"
                                            (bookDay)="bookDayHandler($event)"
                                            (cancel)="resetApointmentHandler()">
                            <fd-leaflet-map [options]="apt.leafletOpt"></fd-leaflet-map>
                        </fd-apointment-form>
                    </ng-container>
                </div>
            </mat-drawer>
            <mat-drawer-content [ngClass]="{'vh-100': drawer.opened}">
                <fd-intro-page
                        description="In questa pagina potrai fissare un appuntamento con la tua banca.">
                </fd-intro-page>
                <mat-card class="col-md-8 offset-md-2 animate__animated animate__fadeIn">
                    <mat-selection-list #locationsList [multiple]="false">
                        <mat-list-option *ngFor="let loc of locations$ | async" [value]="loc._id"
                                         (click)="drawer.open(); selectedLocation$.next(loc)">
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApointmentsComponent implements OnInit, OnDestroy {
    @ViewChild('drawer', {static: true}) drawer!: MatDrawer;
    @ViewChild('locationsList', {static: true}) locationsList!: MatSelectionList;

    locations$ = new BehaviorSubject<Location[]>([])
    selectedLocation$ = new BehaviorSubject<Location | null>(null);
    appointment$: Observable<{ slots: DayWithSlots[], leafletOpt: LeafletOptions }> | null = null;

    sub = new Subscription();

    constructor(public apointmentsService: ApointmentsService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.sub = this.apointmentsService.getLoctions().subscribe(locations => this.locations$.next(locations))

        this.appointment$ = this.selectedLocation$.pipe(
            filter(loc => !!loc),
            switchMap(loc => {
                return this.apointmentsService.getSlotsByLocationId(+loc!._id).pipe(
                    map(slots => {
                        const leafletOpt = {
                            latLng: [loc!.coords[0], loc!.coords[1]],
                            markerText: loc!.address
                        } as LeafletOptions
                        return {slots, leafletOpt};
                    })
                )
            })
        );
    }

    bookDayHandler(day: DayWithSlot) {
        const dialogRef = this.dialog.open(ApointmentConfirmDialogComponent, {data: day});
        dialogRef.afterClosed().pipe(
            filter(confirmed => (confirmed as boolean)),
            switchMapTo(this.apointmentsService.bookApointment(day)),
            map(success => {
                return success
                    ? 'Appuntamento registrato con successo'
                    : 'Spiacente, si sono vericati errori. Riprova più tardi.';
            })
        ).subscribe(msg => {
            this.snackBar.open(msg, undefined, {duration: 2000});
            this.resetApointmentHandler();
        });
    }

    resetApointmentHandler() {
        this.locationsList.deselectAll();
        this.drawer.close();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
