import { Component } from '@angular/core';
import { MaintenanceModel } from 'src/app/models/maintenance-model';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  public maintenance: MaintenanceModel[];
  public displayedColumns = ["description", "startDate", "endDate", "vehicle", "status"];



  
  ngOnInit(): void {
    this.listMaintenances();
  }
  constructor(
   private maintenanceService: MaintenanceService){}
  

  private listMaintenances(): void { 
    this.maintenanceService.getAll()
    .subscribe(
      (response) => {
        this.maintenance = response;
      });
  }

}
