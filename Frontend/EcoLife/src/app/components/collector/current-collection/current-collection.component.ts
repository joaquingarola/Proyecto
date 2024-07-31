import { Component } from '@angular/core';
import { ContainerModel, EmployeeModel, RecolectionModel, RecolectionContainerModel, SectionRecolection, SelectedItem, SelectedItemType, WasteCenterModel } from '../../../models';
import { ContainerService, RecolectionService, RouteService, StorageService } from '../../../services';
import { TypeEnum } from './type.enum';

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
  containersRoute: RecolectionContainerModel[];
  nextDestination: ContainerModel | null;
  finalDestination: WasteCenterModel;
  entityType = TypeEnum.Container;
  updateContainerLoading: boolean = false;
  damageContainerLoading: boolean = false;
  recolectionCompleted: boolean = false;
  section: SectionRecolection;
  totalTime: string;

  constructor(
    private storageServie: StorageService,
    private recolectionService: RecolectionService,
    private routeService: RouteService,
    private containerService: ContainerService) { }

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
          this.vehicleCenter.itemCoords =  [this.recolection.vehicleCenter.latitude, this.recolection.vehicleCenter.longitude];
          this.wasteCenter.itemCoords =  [this.recolection.wasteCenter.latitude, this.recolection.wasteCenter.longitude];
          this.manageContainers(this.recolection.recolectionContainers!);
          this.containersRouteCoords = (this.containersRoute ?? []).map(routeContainer => [routeContainer.container!.latitude, routeContainer.container!.longitude]);
          this.finalDestination  = this.recolection.wasteCenter;
        }

        this.loading = false;
      });
  }

  manageContainers(containers: RecolectionContainerModel[]): void {
    this.containersRoute = containers.sort((a, b) => a.order! - b.order!);

    const nextContainer = containers.find(x => !x.empty);

    if(nextContainer) {
      this.nextDestination = nextContainer.container!;
    } else {
      this.nextDestination = null;
      if(this.recolection.status == 'Iniciada'){
        this.entityType = TypeEnum.WasteCenter;
      } else {
        this.entityType = TypeEnum.VehicleCenter;
      }
    }

    this.updateRouteDraw();
  }

  updateRoute(): void {
    this.updateContainerLoading = true;
    if(this.entityType == TypeEnum.Container) {
      this.routeService.UpdateContainerRoute(this.recolection.id!, this.nextDestination!.id!)
        .subscribe(() => {
          this.containersRoute.find(x => x.containerId! == this.nextDestination!.id!)!.empty = true;
          this.manageContainers(this.containersRoute);
        })
        .add(() => this.updateContainerLoading = false);
    } else {
      if(this.entityType == TypeEnum.WasteCenter) {
        this.recolectionService.wasteCenterReached(this.recolection.id!)
        .subscribe()
        .add(() => {
          this.updateContainerLoading = false;
          this.recolection.status = 'Volviendo al centro de vehículos';
          this.manageContainers(this.containersRoute);
        });
      } else {
        this.recolectionService.completeRecolection(this.recolection.id!)
          .subscribe(() => { 
            this.calculateTime();
          });
      }
    }
  }

  private calculateTime(): void {
    this.recolectionService.getById(this.recolection.id!)
      .subscribe((res: RecolectionModel) => {
        const endDate = new Date(res.realEndDate!);
        const startDate = new Date(res.realStartDate!);
        const diffInMilliseconds = endDate.getTime() - startDate.getTime();
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);
        
        this.recolectionCompleted = true;
        this.totalTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        this.section = { inProgress: false };
      })
      .add(() => {
        this.updateContainerLoading = false;
      });
  }

  updateRouteDraw(): void {
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
      const nextContainer = this.containersRoute[index + 1];

      if (!nextContainer) {
        if(this.entityType == TypeEnum.WasteCenter) {
          this.section = { includeStart: false, includeEnd: true, inProgress: true };
        } else {
          this.section = { includeStart: false, includeEnd: false, includeComeBack: true, inProgress: true };
        }
      } else {
        this.section = { includeStart: false, includeEnd: false, lastRecolected: index, inProgress: true };
      }
    }
  }

  getNextDestination(): string {
    if(this.entityType == TypeEnum.Container) {
      return this.nextDestination!.address;
    }

    let centerAddress: string = '';

    if(this.entityType == TypeEnum.WasteCenter) {
      centerAddress = this.recolection.wasteCenter.address;
    }

    if(this.entityType == TypeEnum.VehicleCenter) {
      centerAddress = this.recolection.vehicleCenter.address;
    }

    const index = centerAddress.indexOf(',');

    return index !== -1 ? centerAddress.substring(0, index) : centerAddress;
  }

  getType(): string {
    return this.entityType;
  }

  getButtonText(): string {
    if(this.entityType == TypeEnum.Container) {
      return 'Contenedor recolectado';
    }

    if(this.entityType == TypeEnum.WasteCenter) {
      return 'Camión descargado';
    }

    return 'Finalizar recoleccion';
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  damagedContainer(): void {
    this.damageContainerLoading = true;
    this.containerService.damagedContainer(this.nextDestination!.id!)
        .subscribe(() => {
          this.containersRoute.find(x => x.containerId! == this.nextDestination!.id!)!.empty = true;
          this.manageContainers(this.containersRoute);
        })
        .add(() => this.damageContainerLoading = false);
  }
}
