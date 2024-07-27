import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecolectionService } from '../../../../services';
import { RecolectionContainerModel, RecolectionModel, RecolectionView, SectionRecolection, SelectedItem, SelectedItemType } from '../../../../models';

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
  recolection: RecolectionModel;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: RecolectionView,
    private recolectionService: RecolectionService) {}

    ngOnInit(): void {  
      this.loading = true;
      this.getRecolection();
    }

    getRecolection(): void {
      this.loading = true;
      this.recolectionService.getById(this.data.idRecolection)
        .subscribe((res: RecolectionModel) => {
          this.recolection = res;
          this.vehicleCenter.itemCoords =  [res.vehicleCenter.latitude, res.vehicleCenter.longitude];
          this.wasteCenter.itemCoords =  [res.wasteCenter.latitude, res.wasteCenter.longitude];
          this.containersRoute = res.recolectionContainers!.sort((a, b) => a.order! - b.order!);
          this.containersRouteCoords = (this.containersRoute ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
          this.updateRouteDraw();
          this.loading = false;
        });
    }

    updateRouteDraw(): void {
      if(this.recolection.status == 'Planificada' || this.recolection.status == 'Finalizada') {
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
          if(this.recolection.status == 'Iniciada') {
            this.section = { includeStart: false, includeEnd: true, inProgress: true };
          } else {
            this.section = { includeStart: false, includeEnd: false, includeComeBack: true, inProgress: true };
          }
        } else {
          this.section = { includeStart: false, includeEnd: false, lastRecolected: index, inProgress: true };
        }
      }
    }
}
