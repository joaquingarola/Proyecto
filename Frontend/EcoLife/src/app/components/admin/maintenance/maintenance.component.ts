import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { MaintenanceService, ModalConfirmationService, SnackbarNotificationService } from '../../../services';
import { StatusEnum } from './status.enum';
import { FinishMaintenanceFormModalComponent } from './finish-maintenance-form-modal/finish-maintenance-form-modal.component';
import { ConfirmationModalData, MaintenanceModel, SnackbarType } from '../../../models';
import { EditMaintenanceFormModalComponent } from './edit-maintenance-form-modal/edit-maintenance-form-modal.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["vehicle", "description", "startDate", "endDate", "status", "options"];
  maintenance: MatTableDataSource<MaintenanceModel> = new MatTableDataSource();
  isLoading = false;
  statusEnum = StatusEnum;
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de cancelar este mantenimiento?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private maintenanceService: MaintenanceService,
    private snackbarNotificationService: SnackbarNotificationService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.listMaintenances();
  }

  private initialize(): void{
    this.maintenance.paginator = this.paginator;
    this.maintenance.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.maintenance.filter = filterValue.trim().toLowerCase();

    if (this.maintenance.paginator) {
      this.maintenance.paginator.firstPage();
    }
  }
    
  private listMaintenances(): void { 
    this.isLoading = true;
    this.maintenanceService.getAll()
    .subscribe(
      (response) => {
        this.maintenance = new MatTableDataSource(response);
        this.initialize();
        this.isLoading = false;
      });
  }

  public finishMaintenance(data: MaintenanceModel): void {
    const dialogRef = this.dialog.open(FinishMaintenanceFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listMaintenances();
          this.snackbarNotificationService.open({ text: 'Mantenimiento finalizado con éxito.', type: SnackbarType.Success });
        }
      });
  }

  public deleteMaintenance(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.maintenanceService.deleteMaintenance(id)
            .subscribe({
              next: () => {
                this.listMaintenances();
                this.snackbarNotificationService.open({ text: 'Mantenimiento eliminado con éxito.', type: SnackbarType.Success });
              },
              error: () => {
                this.snackbarNotificationService.open({ text: 'Ocurrió un error al intentar eliminar el mantenimiento.', type: SnackbarType.Error });
              }
            })
        }
    });
  }

  public editMaintenance(data: MaintenanceModel): void {
    const dialogRef = this.dialog.open(EditMaintenanceFormModalComponent, { data });

    dialogRef.afterClosed()
      .subscribe((res: boolean) => {
        if(res) {
          this.listMaintenances();
          this.snackbarNotificationService.open({ text: 'Mantenimiento actualizado con éxito.', type: SnackbarType.Success });
        }
      });
  }
}
