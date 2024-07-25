import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationModalData, ItemSelection, SnackbarType, VehicleCenterModel } from '../../../models';
import { ModalConfirmationService, SnackbarNotificationService, VehicleCenterService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { VehicleCenterFormModalComponent } from './vehicle-center-form-modal/vehicle-center-form-modal.component';

@Component({
  selector: 'app-vehicle-centers',
  templateUrl: './vehicle-centers.component.html',
  styleUrls: ['./vehicle-centers.component.scss']
})
export class VehicleCentersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["description", "address", "options"];
  vehicleCenters: MatTableDataSource<VehicleCenterModel> = new MatTableDataSource();
  isLoading: boolean;

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar a este centro de vehículos?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  };

  constructor(
    private vehicleCenterService: VehicleCenterService,
    private modalConfirmationService: ModalConfirmationService,
    private snackbarNotificationService: SnackbarNotificationService,
    private dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.listVehicleCenters();
  }

  private initialize(): void{
    this.vehicleCenters.paginator = this.paginator;
    this.vehicleCenters.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicleCenters.filter = filterValue.trim().toLowerCase();

    if (this.vehicleCenters.paginator) {
      this.vehicleCenters.paginator.firstPage();
    }
  }

  private listVehicleCenters(): void { 
    this.isLoading = true;
    this.vehicleCenterService.getAll()
    .subscribe(
      (response) => {
        this.vehicleCenters = new MatTableDataSource(response);
        this.initialize();
        this.isLoading = false;
      });
  }

  public deleteVehicleCenter(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.vehicleCenterService.deleteVehicleCenter(id)
          .subscribe({
            next: () => {
              this.listVehicleCenters();
              this.snackbarNotificationService.open({ text: 'Centro de vehículos eliminado con éxito.', type: SnackbarType.Success });
            },
            error: () => {
              this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar el centro de vehículos.', type: SnackbarType.Error });
            }
          })
        }
    });
  }

  public editVehicleCenter(cont: VehicleCenterModel): void {
    let otherContainers = this.vehicleCenters.data.filter(x => x.id != cont.id);
    let data: ItemSelection<VehicleCenterModel> = {selectedItem: cont, othersItems: otherContainers};
    const dialogRef = this.dialog.open(VehicleCenterFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listVehicleCenters();
          this.snackbarNotificationService.open({ text: 'Centro de vehículos actualizado con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public addVehicleCenter(): void {
    let data: ItemSelection<VehicleCenterModel> = { othersItems: this.vehicleCenters.data };
    const dialogRef = this.dialog.open(VehicleCenterFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listVehicleCenters();
          this.snackbarNotificationService.open({ text: 'Centro de vehículos agregado con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
