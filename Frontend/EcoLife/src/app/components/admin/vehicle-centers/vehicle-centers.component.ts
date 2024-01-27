import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationModalData, ItemSelection, VehicleCenterModel } from '../../../models';
import { ModalConfirmationService, VehicleCenterService } from '../../../services';
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
  public displayedColumns = ["description", "address", "options"];
  public vehicleCenters: MatTableDataSource<VehicleCenterModel>;

  private confirmationData: ConfirmationModalData = {
    message: '¿Estás seguro de eliminar a este centro de vehículos?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  };

  constructor(
    private vehicleCenterService: VehicleCenterService,
    private modalConfirmationService: ModalConfirmationService,
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
    this.vehicleCenterService.getAll()
    .subscribe(
      (response) => {
        this.vehicleCenters = new MatTableDataSource(response);
        this.initialize();
      });
  }

  public deleteVehicleCenter(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.vehicleCenterService.deleteVehicleCenter(id)
            .subscribe(() => this.listVehicleCenters())
        }
    });
  }

  public editVehicleCenter(cont: VehicleCenterModel): void {
    let otherContainers = this.vehicleCenters.data.filter(x => x.id != cont.id);
    let data: ItemSelection<VehicleCenterModel> = {selectedItem: cont, othersItems: otherContainers};
    const dialogRef = this.dialog.open(VehicleCenterFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: () => this.listVehicleCenters()
    });
  }

  public addVehicleCenter(): void {
    let data: ItemSelection<VehicleCenterModel> = { othersItems: this.vehicleCenters.data };
    const dialogRef = this.dialog.open(VehicleCenterFormModalComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: () => this.listVehicleCenters()
    });
  }
}
