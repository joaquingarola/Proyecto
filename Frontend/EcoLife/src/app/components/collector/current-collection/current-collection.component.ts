import { Component } from '@angular/core';
import { ContainerModel, EmployeeModel, RecolectionModel, RouteContainerModel, SectionRecolection, SelectedItem, SelectedItemType, WasteCenterModel } from '../../../models';
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
  containersRouteCoords: Array<L.LatLngTuple>; 
  containersRoute: RouteContainerModel[];
  nextDestination: ContainerModel;
  finalDestination: WasteCenterModel;
  isContainer: boolean = true;
  updateContainerLoading: boolean = false;
  recolectionCompleted: boolean = false;
  section: SectionRecolection;

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
        
        if(this.recolection) {
          this.vehicleCenter.itemCoords =  [this.recolection.vehicleCenter.latitude, this.recolection.vehicleCenter.longitude]
          this.wasteCenter.itemCoords =  [this.recolection.wasteCenter.latitude, this.recolection.wasteCenter.longitude]
          this.finalDestination  = this.recolection.wasteCenter;
        }

        this.getContainers();
      });
  }

  getContainers(): void { 
    if(this.recolection) {
      this.routeService.getById(this.recolection.routeId)
        .subscribe((response) => {
          this.containersRouteCoords = (response.routeContainers ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
          this.manageContainers(response.routeContainers!);
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  manageContainers(containers: RouteContainerModel[]): void {
    this.containersRoute = containers.sort(x => x.order!);

    const nextContainer = containers.find(x => !x.empty);

    if(nextContainer) {
      this.nextDestination = nextContainer.container!;
    } else {
      this.isContainer = false;
    }

    this.updateRouteDraw();
  }

  updateRoute(): void {
    this.updateContainerLoading = true;
    if(this.isContainer) {
      this.routeService.UpdateContainerRoute(this.recolection.routeId, this.nextDestination.id!)
        .subscribe(() => {
          this.containersRoute.find(x => x.containerId! == this.nextDestination.id!)!.empty = true;
          this.manageContainers(this.containersRoute);
        })
        .add(() => this.updateContainerLoading = false);
    } else {
      this.recolectionService.completeRecolection(this.recolection.id!)
        .subscribe(() => this.recolectionCompleted = true)
        .add(() => {
          this.updateContainerLoading = false;
        });
    }
  }

  updateRouteDraw(): void {
    let lastRecolected: RouteContainerModel | null = null;

    for (const container of this.containersRoute) {
      if (container.empty) {
        lastRecolected = container;
      }
    }

    if (!lastRecolected) {
      this.section = { includeStart: true, includeEnd: false };
    } else {
      const index = this.containersRoute.indexOf(lastRecolected);
      const siguienteContenedor = this.containersRoute[index + 1];

      if (!siguienteContenedor) {
        this.section = { includeStart: false, includeEnd: true };
      } else {
        this.section = { includeStart: false, includeEnd: false, lastRecolected: index };
      }
    }
  }
}
