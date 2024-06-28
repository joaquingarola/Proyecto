import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteService } from '../../../../services';
import { RecolectionView, SelectedItem, SelectedItemType } from '../../../../models';

@Component({
  selector: 'app-view-recolection',
  templateUrl: './view-recolection.component.html',
  styleUrl: './view-recolection.component.scss'
})
export class ViewRecolectionComponent {
  public vehicleCenter: SelectedItem = { type: SelectedItemType.VehicleCenter };
  public wasteCenter: SelectedItem = { type: SelectedItemType.WasteCenter };
  public containersRoute: Array<L.LatLngTuple>; 
  public loading: boolean;

  constructor( 
    private routeService: RouteService,
    @Inject(MAT_DIALOG_DATA) public data: RecolectionView) {}

    ngOnInit(): void {  
      this.loading = true;
      this.vehicleCenter.itemCoords =  [this.data.vehicleCenter.latitude, this.data.vehicleCenter.longitude]
      this.wasteCenter.itemCoords =  [this.data.wasteCenter.latitude, this.data.wasteCenter.longitude]
      this.getContainers();
    }

    private getContainers(): void { 
      this.routeService.getById(this.data.routeId)
      .subscribe(
        (response) => {
          this.containersRoute = (response.routeContainers ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
          this.loading = false;
        });
    }
}
