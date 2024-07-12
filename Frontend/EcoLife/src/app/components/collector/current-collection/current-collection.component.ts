import { Component } from '@angular/core';
import { EmployeeModel, RecolectionModel, SelectedItem, SelectedItemType } from '../../../models';
import { RecolectionService, RouteService, StorageService } from '../../../services';

@Component({
  selector: 'app-current-collection',
  templateUrl: './current-collection.component.html',
  styleUrl: './current-collection.component.scss'
})
export class CurrentCollectionComponent {
  loading = false;
  user: EmployeeModel;
  recolection: RecolectionModel;
  vehicleCenter: SelectedItem = { type: SelectedItemType.VehicleCenter };
  wasteCenter: SelectedItem = { type: SelectedItemType.WasteCenter };
  containersRoute: Array<L.LatLngTuple>; 

  constructor(
    private storageServie: StorageService,
    private recolectionService: RecolectionService,
    private routeService: RouteService) { }

  ngOnInit(): void {
    this.user = this.storageServie.getUser();
    this.getInProgressRecolection();
  }

  getInProgressRecolection(): void {
    this.loading = true;
    this.recolectionService.getInProgressByEmployeeId(this.user.id!)
      .subscribe((res: RecolectionModel) => {
        this.recolection = res;
        this.vehicleCenter.itemCoords =  [this.recolection.vehicleCenter.latitude, this.recolection.vehicleCenter.longitude]
        this.wasteCenter.itemCoords =  [this.recolection.wasteCenter.latitude, this.recolection.wasteCenter.longitude]
        this.getContainers();
      });
  }

  getContainers(): void { 
    this.routeService.getById(this.recolection.routeId)
    .subscribe(
      (response) => {
        this.containersRoute = (response.routeContainers ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
        this.loading = false;
      });
  }
}
