import { Component, ViewChild } from '@angular/core';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { VehiclesFormModalComponent } from './vehicles-form-modal/vehicles-form-modal.component';
import { NotifyMaintenanceFormModalComponent } from './notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarNotificationService } from '../../services/snackbar-notification/snackbar-notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ["patent", "description", "model", "buyDate", "options"];
  public vehicles: MatTableDataSource<VehicleModel>
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar este vehículo?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private vehicleService: VehicleService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog,
    private snackbarNotificationService: SnackbarNotificationService
  ) { }

  ngOnInit(): void {
    this.listVehicles();
  }

  private initialize(): void{
    this.vehicles.paginator = this.paginator;
    this.vehicles.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicles.filter = filterValue.trim().toLowerCase();

    if (this.vehicles.paginator) {
      this.vehicles.paginator.firstPage();
    }
  }

  private listVehicles(): void { 
    this.vehicleService.getAll()
    .subscribe(
      (response) => {
        this.vehicles = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteVehicle(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.vehicleService.deleteVehicle(id)
            .subscribe({
              next: () => {
                this.listVehicles();
                this.snackbarNotificationService.open('Se elimino el vehículo con éxito');
              },
              error: () => this.snackbarNotificationService.open('Error: Existen mantenimientos para el vehículo')
            })
        }
      });
  }

  public editVehicle(data: VehicleModel): void {
    const dialogRef = this.dialog.open(VehiclesFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (res) => this.listVehicles()
    });
  }

  public addVehicle(): void {
    const dialogRef = this.dialog.open(VehiclesFormModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => { 
        this.listVehicles();
        this.snackbarNotificationService.open('aa');
      }
    });
  }

  public notifyMaintenance(data: VehicleModel): void{
    const dialogRef = this.dialog.open(NotifyMaintenanceFormModalComponent, { data });

    /* dialogRef.afterClosed().subscribe({
      next: (res) => this.listVehicles()
    }); */
  }
}


