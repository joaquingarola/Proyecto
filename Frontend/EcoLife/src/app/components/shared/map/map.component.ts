import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';

import { CoordinatesModel } from '../../../models';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() selectedContainer: L.LatLngTuple; 
  @Input() othersContainers: Array<L.LatLngTuple>; 
  @Input() disabledClick: boolean = false;
  @Output() coords = new EventEmitter<CoordinatesModel | null>();

  private defaultCoords: L.LatLngTuple = [-32.949007, -60.642593];
  private map: L.Map;
  private marker: L.Marker;
  public selectedCoords: CoordinatesModel;
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

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.selectedContainer ?? this.defaultCoords, 16);

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
      this.selectedCoords = { latitude: latlng.lat, longitude: latlng.lng };
      this.coords.emit(this.selectedCoords);
    }
  }
}
