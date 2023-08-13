import { Component } from '@angular/core';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { VehiclesFormModalComponent } from './vehicles-form-modal/vehicles-form-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  public vehicles: VehicleModel[];
  public displayedColumns = ["id", "patent", "description", "model", "buyDate", "options"];
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de eliminar este vehículo?',
    confirmCaption: 'Eliminar',
    cancelCaption: 'Cancelar'
  }

  constructor(
    private vehicleService: VehicleService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listVehicles();
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
          this.vehicleService.deleteCategory(id)
            .subscribe(res => this.listVehicles())
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
}


