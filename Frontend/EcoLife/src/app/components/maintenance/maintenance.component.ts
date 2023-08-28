import { Component } from '@angular/core';
import { MaintenanceModel } from 'src/app/models/maintenance-model';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';
import { StatusEnum } from './status.enum';
import { MatDialog } from '@angular/material/dialog';
import { FinishMaintenanceFormModalComponent } from './finish-maintenance-form-modal/finish-maintenance-form-modal.component';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  public maintenance: MaintenanceModel[];
  public displayedColumns = ["vehicle", "description", "startDate", "endDate", "status", "options"];
  public statusEnum = StatusEnum;
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de cancelar este mantenimiento?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private maintenanceService: MaintenanceService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog){}
  
  ngOnInit(): void {
    this.listMaintenances();
  }

  private listMaintenances(): void { 
    this.maintenanceService.getAll()
    .subscribe(
      (response) => {
        this.maintenance = response;
      });
  }

  public finishMaintenance(data: MaintenanceModel): void {
    const dialogRef = this.dialog.open(FinishMaintenanceFormModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (res) => this.listMaintenances()
    });
  }

  public deleteMaintenance(id: number): void {
    this.modalConfirmationService.open(this.confirmationData)
      .subscribe(response => {
        if(response){
          this.maintenanceService.deleteMaintenance(id)
            .subscribe(res => this.listMaintenances())
        }
      });
  }
}
