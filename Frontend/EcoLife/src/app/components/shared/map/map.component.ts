import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NominatimPlaceModel } from '../../../models';
import { GeocodeService } from '../../../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() selectedContainer: L.LatLngTuple; 
  @Input() othersContainers: Array<L.LatLngTuple>; 
  @Input() disabledClick: boolean = false;
  @Output() coords = new EventEmitter<NominatimPlaceModel | null>();

  private defaultCoords: L.LatLngTuple = [-32.949007, -60.642593];
  private map: L.Map;
  private marker: L.Marker;
  public containerIcon = L.icon({
    iconUrl: '../../../../assets/container_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });
  public containerDisabledIcon = L.icon({
    iconUrl: '../../../../assets/container_disabled_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });

  constructor(
    private geocodeService: GeocodeService,
  ) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.selectedContainer ?? this.defaultCoords, 16);

    const searchControl = GeoSearchControl({
      provider: new OpenStreetMapProvider({
        params: {
          'accept-language': 'es',
          countrycodes: 'ar',
          viewbox: '-60.6000710, -33.0138457, -60.7818604, -32.8756947'
        }
      }),
      searchLabel: 'Ingrese una dirección',
      notFoundMessage: 'No se encontró ninguna ubicación que coincida con lo ingresado',
      showMarker: false,
      autoClose: true,
      keepResult: true
    });

    this.map.addControl(searchControl);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    if(this.othersContainers) {
      this.othersContainers.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.containerDisabledIcon});
        marker.addTo(this.map);
      });
    }

    if(this.selectedContainer) {
      this.marker = new L.Marker(this.selectedContainer, {icon: this.containerIcon});
      this.marker.addTo(this.map).on('click', 
        (e: L.LeafletMouseEvent) => {
          if(this.disabledClick) {
            e.originalEvent.preventDefault();
          } else {
            e.target.remove();
            this.updateCoords(e.latlng, true);
          }
        });
    }

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if(this.disabledClick) {
        e.originalEvent.preventDefault();
      } else {
        if(this.marker) {
          this.map.removeLayer(this.marker);
        }
        
        this.marker = new L.Marker(e.latlng, {icon: this.containerIcon});
        this.marker.addTo(this.map).on('click', 
          (e: L.LeafletMouseEvent) => {
            e.target.remove();
            this.updateCoords(e.latlng, true);
          });
  
        this.updateCoords(e.latlng, false);
      }
    });
  }

  private updateCoords(latlng: L.LatLng, markerClick: boolean): void {
    if(markerClick){
      this.coords.emit(null);

    } else {
      this.coords.emit(null);
      let selectedCoords = { latitude: latlng.lat, longitude: latlng.lng };
      this.geocodeService.getAddress(selectedCoords)
        .subscribe(response => this.coords.emit(response));
    }
  }
}
