import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import {LeafletOptions} from './leaflet-options.model';

@Component({
    selector: 'fd-leaflet-map',
    template: `
        <div #host class="w-auto border border-3 mb-3" style="height: 300px;"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements OnInit, OnChanges {
    @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;
    @Input() position!: LeafletOptions | null;
    @Input() zoom: number = 5;
    @Input() height: number | null = null;

    map!: L.Map;
    marker!: L.Marker;

    ngOnInit() {
        if (!this.position) {
            throw new Error('Passare configurazione per inizializzare il componente');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.position && changes.position.firstChange && this.position) {
            const coords: L.LatLngExpression = this.position.latLng as L.LatLngExpression;

            if (this.height) {
                this.host.nativeElement.setAttribute('style', `height:${this.height}px`);
            }

            this.map = L.map(this.host.nativeElement).setView(coords, this.zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
                this.map
            );

            if (this.position.markerText) {
                this.marker = L.marker(coords)
                    .addTo(this.map)
                    .bindPopup(this.position.markerText)
                    .openPopup();
            }
        }

        if (changes.coords && !changes.coords.firstChange && this.position) {
            const coords: L.LatLngExpression = this.position
                .latLng as L.LatLngExpression;
            this.map.setView(coords);
            this.marker.setLatLng(coords);
        }

        if (changes.zoom) {
            this.map.setZoom(changes.zoom.currentValue);
        }
    }
}
