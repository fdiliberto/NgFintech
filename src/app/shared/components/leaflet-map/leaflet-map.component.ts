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
        <div #host class="w-auto border border-3 mb-3"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements OnInit, OnChanges {
    @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;
    @Input() options!: LeafletOptions;

    private defaultZoom = 15;
    private defaultHeight = 300;
    private map!: L.Map;
    private marker!: L.Marker;

    ngOnInit() {
        if (!this.options) {
            throw new Error('Passare configurazione per inizializzare il componente');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.options) {
            const currentOptions = changes.options.currentValue;
            const coords: L.LatLngExpression = currentOptions.latLng as L.LatLngExpression;
            const zoom = currentOptions.zoom || this.defaultZoom;
            const height = currentOptions.height || this.defaultHeight;

            if (changes.options.firstChange) {
                // imposto altezza div
                this.host.nativeElement.setAttribute('style', `height:${height}px`);

                // set della mappa iniziale
                this.map = L.map(this.host.nativeElement).setView(coords, zoom);

                //aggiunta del layer sulla mappa
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

                // aggiunta marker
                if (this.options.markerText) {
                    this.marker = L.marker(coords).addTo(this.map)
                        .bindPopup(this.options.markerText)
                        .openPopup();
                }
            } else {
                this.map.setView(coords);
                this.marker.setLatLng(coords);
            }
        }
    }
}
