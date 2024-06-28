import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import "leaflet-routing-machine";

import { NominatimPlaceModel, OtherItems, RouteItem, SelectedItem, SelectedItemType } from '../../../models';
import { GeocodeService } from '../../../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() route: L.LatLng[];
  @Input() selectedItem: SelectedItem; 
  @Input() selectedLastItem: SelectedItem; 
  @Input() containersRecolection: Array<L.LatLngTuple>;
  @Input() otherItems: OtherItems; 
  @Input() selelectedContainersRoute: Array<L.LatLng>; 
  @Input() wasteCenters: Array<L.LatLngTuple>; 
  @Input() selectedWasteCenter: L.LatLngTuple | null;
  @Input() vehicleCenters: Array<L.LatLngTuple>;
  @Input() selectedVehicleCenter: L.LatLngTuple | null; 
  @Input() disabledClick: boolean = false;
  @Input() createRoute: boolean = false;
  @Output() coords = new EventEmitter<NominatimPlaceModel | null>();
  @Output() selectedCoords = new EventEmitter<L.LatLng>();
  @Output() selectedWasteCenterUpdate = new EventEmitter<L.LatLng | null>();
  @Output() selectedVehicleCenterUpdate = new EventEmitter<L.LatLng | null>();

  private markers: L.Marker[] = [];
  private actualWasteCenter : L.Marker;
  private actualVehicleCenter : L.Marker;
  private routeFirstSection: L.LatLng[];
  private defaultCoords: L.LatLngTuple = [-32.949007, -60.642593];
  private map: L.Map;
  private marker: L.Marker;
  private otherItemsMarker: L.Marker[] = [];;
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

  public icons: { [key in SelectedItemType]: L.Icon } = {
    [SelectedItemType.Container]: this.containerIcon,
    [SelectedItemType.ContainerDisabled]: this.containerDisabledIcon,
    [SelectedItemType.VehicleCenter]: this.vehicleCenterIcon,
    [SelectedItemType.VehicleCenterDisabled]: this.vehicleCenterDisabledIcon,
    [SelectedItemType.WasteCenter]: this.wasteCenterIcon,
    [SelectedItemType.wasteCenterDisabled]: this.wasteCenterDisabledIcon
  };

  constructor(
    private geocodeService: GeocodeService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['selectedVehicleCenter']?.currentValue) {
      this.updateVehicleCenter(changes?.['selectedVehicleCenter']?.currentValue)
    }

    if(changes?.['selectedWasteCenter']?.currentValue) {
      this.updateWasteCenter(changes?.['selectedWasteCenter']?.currentValue)
    }

    if(changes?.['otherItems']?.currentValue) {
      this.updateOtherItems(changes?.['otherItems']?.currentValue)
    }
  }

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

    if(this.selectedLastItem?.itemCoords) {
      if(this.selectedItem?.itemCoords) {
        const coords: RouteItem[] = [];
        coords.push( { itemCoords: new L.LatLng(this.selectedItem.itemCoords[0], this.selectedItem.itemCoords[1]), type: SelectedItemType.VehicleCenter });
        this.containersRecolection.forEach((containerCoord: L.LatLngTuple) => {
          coords.push({ itemCoords: new L.LatLng(containerCoord[0], containerCoord[1]), type: SelectedItemType.Container })
        });
        coords.push( { itemCoords: new L.LatLng(this.selectedLastItem.itemCoords[0], this.selectedLastItem.itemCoords[1]), type: SelectedItemType.WasteCenter });
        this.drawViewRecolectionRoute(coords);

        return;
      }
    }

    if(this.otherItems?.itemsCoords) {
      this.otherItems.itemsCoords.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.icons[this.otherItems.type]});
        this.otherItemsMarker.push(marker);
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

    // this.addRoute(this.route, true);

    /* if(this.route) {
      if(this.route.length >=2) {
        this.routeFirstSection = this.route.slice(0,2);
        this.route.splice(0,2);
        this.addRoute(this.routeFirstSection, true);
      }
      this.addRoute(this.route);
    } */

    if(this.selectedItem?.itemCoords) {
      this.marker = new L.Marker(this.selectedItem.itemCoords, { icon: this.icons[this.selectedItem.type] });
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
        
        this.marker = new L.Marker(e.latlng, { icon: this.icons[this.selectedItem.type] });
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
            let actualLatLng = this.actualVehicleCenter?.getLatLng();
            if(actualLatLng?.lat == e.latlng.lat && actualLatLng?.lng == e.latlng.lng) {
              e.target.setIcon(this.vehicleCenterDisabledIcon);
              this.selectedVehicleCenterUpdate.emit(null);
              this.actualVehicleCenter.setLatLng([0,0]);
            } else {
              let oldMarker = this.markers.find(m => m.getLatLng().lat == actualLatLng?.lat && m.getLatLng().lng == actualLatLng?.lng);
              oldMarker?.setIcon(this.vehicleCenterDisabledIcon);
              this.selectedVehicleCenterUpdate.emit(e.latlng);
              this.actualVehicleCenter = new L.Marker(e.latlng);
              e.target.setIcon(this.vehicleCenterIcon);
            }
          });
        this.markers.push(marker);
      });
    }
  }

  private updateVehicleCenter(newCoords: L.LatLngTuple): void {
    let actualLatLng = this.actualVehicleCenter?.getLatLng();
    let oldMarker = this.markers.find(m => m.getLatLng().lat == actualLatLng?.lat && m.getLatLng().lng == actualLatLng?.lng);
    oldMarker?.setIcon(this.vehicleCenterDisabledIcon);
    let newMarker = this.markers.find(m => m.getLatLng().lat == newCoords[0] && m.getLatLng().lng == newCoords[1]);
    newMarker?.setIcon(this.vehicleCenterIcon);
    this.actualVehicleCenter = new L.Marker(newCoords);
  }

  private loadWasteCenters(): void {
    if(this.wasteCenters) {
      this.wasteCenters.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.wasteCenterDisabledIcon});
        marker.addTo(this.map).on('click', 
          (e: L.LeafletMouseEvent) => {
            let actualLatLng = this.actualWasteCenter?.getLatLng();
            if(actualLatLng?.lat == e.latlng.lat && actualLatLng?.lng == e.latlng.lng) {
              e.target.setIcon(this.wasteCenterDisabledIcon);
              this.selectedWasteCenterUpdate.emit(null);
              this.actualWasteCenter.setLatLng([0,0]);
            } else {
              let oldMarker = this.markers.find(m => m.getLatLng().lat == actualLatLng?.lat && m.getLatLng().lng == actualLatLng?.lng);
              oldMarker?.setIcon(this.wasteCenterDisabledIcon);
              this.selectedWasteCenterUpdate.emit(e.latlng);
              this.actualWasteCenter = new L.Marker(e.latlng);
              e.target.setIcon(this.wasteCenterIcon);
            }
          });
        this.markers.push(marker);
      });
    }
  }

  private updateWasteCenter(newCoords: L.LatLngTuple): void {
    let actualLatLng = this.actualWasteCenter?.getLatLng();
    let oldMarker = this.markers.find(m => m.getLatLng().lat == actualLatLng?.lat && m.getLatLng().lng == actualLatLng?.lng);
    oldMarker?.setIcon(this.wasteCenterDisabledIcon);
    let newMarker = this.markers.find(m => m.getLatLng().lat == newCoords[0] && m.getLatLng().lng == newCoords[1]);
    newMarker?.setIcon(this.wasteCenterIcon);
    this.actualWasteCenter = new L.Marker(newCoords);
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

  private drawViewRecolectionRoute(items: RouteItem[]): void {
    const coords: L.LatLng[] = items.map(x => x.itemCoords!);
    const iconsArray: L.Icon[] = items.map(x => this.icons[x.type]);
    
    L.Routing.control({
      plan: new L.Routing.Plan(coords,
        {
          createMarker: function(i, waypoint, n){
            return L.marker(waypoint.latLng, { icon: iconsArray[i] });
          }
        }
      ),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'green', opacity: 1, weight: 5 }],
        extendToWaypoints: false,
        addWaypoints: false,
        missingRouteTolerance: 5
      }
    }).addTo(this.map);
  }

  private getViewCoords(): L.LatLngTuple {
    if(this.selectedItem?.itemCoords) {
      return this.selectedItem.itemCoords;
    }

    if(this.route) {
      let firstItem: L.LatLngTuple = [this.route[0].lat, this.route[0].lng];
      return firstItem;
    }

    return this.defaultCoords;
  }

  private updateOtherItems(otherItems: OtherItems): void {
    if(this.map) {
      this.otherItemsMarker?.forEach(x => this.map.removeLayer(x));
      this.otherItemsMarker = [];
      otherItems?.itemsCoords?.forEach((coords: L.LatLngTuple) => {
        let marker = new L.Marker(coords, {icon: this.icons[this.otherItems.type]});
        this.otherItemsMarker.push(marker);
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
  }
}
