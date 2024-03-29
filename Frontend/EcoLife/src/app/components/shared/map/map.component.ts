import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import "leaflet-routing-machine";

import { NominatimPlaceModel } from '../../../models';
import { GeocodeService } from '../../../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() route: L.LatLng[];
  @Input() selectedContainer: L.LatLngTuple; 
  @Input() containersRecolection: Array<L.LatLngTuple>;
  @Input() othersContainers: Array<L.LatLngTuple>; 
  @Input() selelectedContainersRoute: Array<L.LatLng>; 
  @Input() wasteCenters: Array<L.LatLngTuple>; 
  @Input() vehicleCenters: Array<L.LatLngTuple>; 
  @Input() disabledClick: boolean = false;
  @Input() createRoute: boolean = false;
  @Output() coords = new EventEmitter<NominatimPlaceModel | null>();
  @Output() selectedCoords = new EventEmitter<L.LatLng>();
  @Output() selectedWasteCenter = new EventEmitter<L.LatLng>();
  @Output() selectedVehicleCenter = new EventEmitter<L.LatLng>();

  private routeFirstSection: L.LatLng[];
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
  public vehicleCenterIcon = L.icon({
    iconUrl: '../../../../assets/vehicle_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });
  public vehicleCenterDisabledIcon = L.icon({
    iconUrl: '../../../../assets/vehicle_disabled_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });
  public wasteCenterIcon = L.icon({
    iconUrl: '../../../../assets/waste_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });
  public wasteCenterDisabledIcon = L.icon({
    iconUrl: '../../../../assets/waste_disabled_icon.png',
    iconSize: [48, 48],
    iconAnchor: [6, 42]
  });

  constructor(
    private geocodeService: GeocodeService,
  ) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.getViewCoords(), 16);

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
        if(!this.createRoute) {
          marker.addTo(this.map);
        } else {
          marker.addTo(this.map).on('click', 
          (e: L.LeafletMouseEvent) => {
            if(this.selelectedContainersRoute.includes(e.latlng)) {
              e.target.setIcon(this.containerDisabledIcon);
            } else {
              e.target.setIcon(this.containerIcon);
            }
            this.selectedCoords.emit(e.latlng)
          });
        }
      });
    }

    if(this.selelectedContainersRoute) {
      this.selelectedContainersRoute.forEach((coords: L.LatLng) => {
        let marker = new L.Marker(coords, {icon: this.containerIcon});

        marker.addTo(this.map).on('click', 
        (e: L.LeafletMouseEvent) => {
          if(this.selelectedContainersRoute.includes(e.latlng)) {
            e.target.setIcon(this.containerDisabledIcon);
          } else {
            e.target.setIcon(this.containerIcon);
          }
          this.selectedCoords.emit(e.latlng)
        });
      });
    }

    if(this.containersRecolection) {
      this.containersRecolection.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.containerIcon});
        marker.addTo(this.map);
      })
    }

    this.loadVehicleCenters();

    this.loadWasteCenters();

    this.addRoute(this.route, true);

    /* if(this.route) {
      if(this.route.length >=2) {
        this.routeFirstSection = this.route.slice(0,2);
        this.route.splice(0,2);
        this.addRoute(this.routeFirstSection, true);
      }
      this.addRoute(this.route);
    } */

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

  private loadVehicleCenters(): void {
    if(this.vehicleCenters) {
      this.vehicleCenters.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.vehicleCenterDisabledIcon});
        marker.addTo(this.map).on('click', 
          (e: L.LeafletMouseEvent) => {
            this.selectedVehicleCenter.emit(e.latlng);
            e.target.setIcon(this.vehicleCenterIcon);
          });
      });
    }
  }

  private loadWasteCenters(): void {
    if(this.wasteCenters) {
      this.wasteCenters.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.wasteCenterDisabledIcon});
        marker.addTo(this.map).on('click', 
          (e: L.LeafletMouseEvent) => {
            this.selectedWasteCenter.emit(e.latlng);
            e.target.setIcon(this.wasteCenterIcon);
          });
      });
    }
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

  private addRoute(coords: L.LatLng[], firstSection: boolean = false): void {
    L.Routing.control({
      plan: new L.Routing.Plan(coords,
        {
          createMarker: function(i, waypoint, n){
            let icon = L.icon({
              iconUrl: firstSection ? '../../../../assets/container_icon.png' : '../../../../assets/container_disabled_icon.png',
              iconSize: [48, 48],
              iconAnchor: [6, 42]
            });
            return L.marker(waypoint.latLng, { icon: icon });
          }
        }
      ),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'green', opacity: firstSection ? 1 : 0.3, weight: 5 }],
        extendToWaypoints: false,
        addWaypoints: false,
        missingRouteTolerance: 5
      }
    }).addTo(this.map);
  }

  private getViewCoords(): L.LatLngTuple {
    if(this.selectedContainer) {
      return this.selectedContainer;
    }

    if(this.route) {
      let firstItem: L.LatLngTuple = [this.route[0].lat, this.route[0].lng];
      return firstItem;
    }

    return this.defaultCoords;
  }
}
