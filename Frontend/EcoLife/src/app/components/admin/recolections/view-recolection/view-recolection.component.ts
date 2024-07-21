import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteService } from '../../../../services';
import { RecolectionContainerModel, RecolectionView, SectionRecolection, SelectedItem, SelectedItemType } from '../../../../models';

@Component({
  selector: 'app-view-recolection',
  templateUrl: './view-recolection.component.html',
  styleUrl: './view-recolection.component.scss'
})
export class ViewRecolectionComponent {
  vehicleCenter: SelectedItem = { type: SelectedItemType.VehicleCenter };
  wasteCenter: SelectedItem = { type: SelectedItemType.WasteCenter };
  containersRouteCoords: Array<L.LatLngTuple>; 
  containersRoute: RecolectionContainerModel[];
  loading: boolean;
  section: SectionRecolection;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: RecolectionView) {}

    ngOnInit(): void {  
      this.loading = true;
      this.vehicleCenter.itemCoords =  [this.data.vehicleCenter.latitude, this.data.vehicleCenter.longitude];
      this.wasteCenter.itemCoords =  [this.data.wasteCenter.latitude, this.data.wasteCenter.longitude];
      this.containersRoute = this.data.containers.sort((a, b) => a.order! - b.order!);
      this.containersRouteCoords = (this.containersRoute ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
      this.updateRouteDraw();
      this.loading = false;
    }

    updateRouteDraw(): void {
      if(this.data.status != 'Iniciada') {
        this.section = { inProgress: false };
        return;
      }

      let lastRecolected: RecolectionContainerModel | null = null;

      for (const container of this.containersRoute) {
        if (container.empty) {
          lastRecolected = container;
        }
      }
  
      if (!lastRecolected) {
        this.section = { includeStart: true, includeEnd: false, inProgress: true };
      } else {
        const index = this.containersRoute.indexOf(lastRecolected);
        const siguienteContenedor = this.containersRoute[index + 1];
  
        if (!siguienteContenedor) {
          this.section = { includeStart: false, includeEnd: true, inProgress: true };
        } else {
          this.section = { includeStart: false, includeEnd: false, lastRecolected: index, inProgress: true };
        }
      }
    }
}
