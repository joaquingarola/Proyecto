import { Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';

import { ContainerService, ModalConfirmationService, RouteService, SnackbarNotificationService, VehicleCenterService, WasteCenterService } from '../../../services';
import { ConfirmationModalData, ContainerModel, NewRecolectionModel, NewRouteModel, RecolectionModel, RouteModel, SnackbarType, VehicleCenterModel, WasteCenterModel } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { RoutesFormModalComponent } from './routes-form-modal/routes-form-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlanifyRecolectionComponent } from './planify-recolection/planify-recolection.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  public showCreateRoute = false;
  public containers: ContainerModel[];
  public wasteCenters: WasteCenterModel[];
  public wasteCentersCoords: Array<L.LatLngTuple>; 
  public vehicleCenters: VehicleCenterModel[];
  public vehicleCentersCoords: Array<L.LatLngTuple>; 
  public containersWithoutRoute: Array<L.LatLngTuple>; 
  public selectedContainers: Array<L.LatLng> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ["periodicity", "description", "quantity", "options"];
  public routes: MatTableDataSource<RouteModel>
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar esta ruta?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private dialog: MatDialog,
    private routeService: RouteService,
    private containerService: ContainerService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private wasteCenterService: WasteCenterService,
    private vehicleCenterService: VehicleCenterService) { }

  ngOnInit(): void {
    this.getContainers();
    this.getWasteCenter();
    this.getVehicleCenter();
    this.listRoutes();
  }

  private initialize(): void{
    this.routes.paginator = this.paginator;
    this.routes.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.routes.filter = filterValue.trim().toLowerCase();

    if (this.routes.paginator) {
      this.routes.paginator.firstPage();
    }
  }

  private listRoutes(): void { 
    this.routeService.getAll()
    .subscribe(
      (response) => {
        this.routes = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteRoute(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.routeService.deleteRoute(id)
            .subscribe({
              next: () => {
                this.getContainers();
                this.listRoutes();
                this.snackbarNotificationService.open({ text: 'Ruta eliminada con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar la ruta.', type: SnackbarType.Error });
              }
            })
          }
      });
  }

 public editRoute(editRoute: RouteModel): void {
    const containersTotal = [...this.containers, ...editRoute.containers];

    const data: NewRouteModel = { route: editRoute, containers: containersTotal, containersWithoutRoute: this.containersWithoutRoute };
    const dialogRef = this.dialog.open(RoutesFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.getContainers(),
          this.listRoutes()
          this.snackbarNotificationService.open({ text: 'Ruta actualizada con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public planify(route: RouteModel): void {
    const data: NewRecolectionModel = { route: route, wasteCenters: this.wasteCentersCoords, vehicleCenters: this.vehicleCentersCoords };
    const dialogRef = this.dialog.open(PlanifyRecolectionComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.getContainers(),
          this.listRoutes()
          this.snackbarNotificationService.open({ text: 'Recolección planificada con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public addRoute(): void {
    const data: NewRouteModel = { containers: this.containers, containersWithoutRoute: this.containersWithoutRoute };
    const dialogRef = this.dialog.open(RoutesFormModalComponent, { data } );
    
    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.getContainers(),
          this.listRoutes()
          this.snackbarNotificationService.open({ text: 'Ruta agregada con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public getContainers(): void {
    this.containerService.getAllWithoutRoute()
      .subscribe(
        (response) => {
          this.containers = response;
          this.containersWithoutRoute = (response ?? []).map(container => [container.latitude, container.longitude]);
        })  
  }

  public getWasteCenter(): void {
    this.wasteCenterService.getAll()
      .subscribe(
        (response) => {
          this.wasteCenters = response;
          this.wasteCentersCoords = (response ?? []).map(x => [x.latitude, x.longitude]);
        }
      )  
  }

  public getVehicleCenter(): void {
    this.vehicleCenterService.getAll()
      .subscribe(
        (response) => {
          this.vehicleCenters = response;
          this.vehicleCentersCoords = (response ?? []).map(x => [x.latitude, x.longitude]);
        }
      )  
  }
}
