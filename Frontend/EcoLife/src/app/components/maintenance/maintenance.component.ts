import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaintenanceModel } from 'src/app/models/maintenance-model';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';
import { StatusEnum } from './status.enum';
import { MatDialog } from '@angular/material/dialog';
import { FinishMaintenanceFormModalComponent } from './finish-maintenance-form-modal/finish-maintenance-form-modal.component';
import { ModalConfirmationService } from '../../services/modal-confirmation/modal-confirmation.service';
import { ConfirmationModalData } from '../../models/confirmation-modal-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements AfterViewInit {
  public maintenance: MaintenanceModel[];
  public displayedColumns = ["vehicle", "description", "startDate", "endDate", "status", "options"];
  public Maintenance: MatTableDataSource<MaintenanceModel>;
  public statusEnum = StatusEnum;
  private confirmationData: ConfirmationModalData = {
    message: 'Estás seguro de cancelar este mantenimiento?',
    confirmCaption: 'Si',
    cancelCaption: 'No'
  }

  constructor(
    private maintenanceService: MaintenanceService,
    private modalConfirmationService: ModalConfirmationService,
    private dialog: MatDialog){
    }
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      
      this.listMaintenances();
    }

    ngAfterViewInit() {
      this.Maintenance = new MatTableDataSource(this.maintenance)
      this.Maintenance.paginator = this.paginator;
      this.Maintenance.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina';

    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.Maintenance.filter = filterValue.trim().toLowerCase();
  
      if (this.Maintenance.paginator) {
        this.Maintenance.paginator.firstPage();
      }
    }
    
  private listMaintenances(): void { 
    this.maintenanceService.getAll()
    .subscribe(
      (response) => {
        this.maintenance = response;
        this.Maintenance.data = this.maintenance;
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
