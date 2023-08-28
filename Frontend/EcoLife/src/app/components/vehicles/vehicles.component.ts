import { Component } from '@angular/core';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { VehiclesFormModalComponent } from './vehicles-form-modal/vehicles-form-modal.component';
import { NotifyMaintenanceFormModalComponent } from './notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  public vehicles: VehicleModel[];
  public displayedColumns = ["patent", "description", "model", "buyDate", "options"];
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar este vehículo?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private vehicleService: VehicleService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listVehicles();
  }

  mensajeExito(){
    this._snackBar.open('El Vehiculo fue eliminado con éxito', '' , {
      duration: 4000,
      horizontalPosition: 'right',
    })
  }

  private listVehicles(): void { 
    this.vehicleService.getAll()
    .subscribe(
      (response) => {
        this.vehicles = response;
      });
  }

  public deleteVehicle(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.vehicleService.deleteVehicle(id)
            .subscribe(res => this.listVehicles()),
            this.mensajeExito()
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
      next: (res) => this.listVehicles()
    });
  }

  public notifyMaintenance(data: VehicleModel): void{
    const dialogRef = this.dialog.open(NotifyMaintenanceFormModalComponent, { data });

    /* dialogRef.afterClosed().subscribe({
      next: (res) => this.listVehicles()
    }); */
  }
}


