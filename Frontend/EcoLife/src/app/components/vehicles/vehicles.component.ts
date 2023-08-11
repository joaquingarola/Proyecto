import { Component } from '@angular/core';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  public vehicles: VehicleModel[];
  public displayedColumns = ["id", "patent", "description", "model", "buyDate", "options"];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.listVehicles();
  }

  private listVehicles(): void { 
    this.vehicleService.getAll()
    .subscribe(
      (response) => {
        this.vehicles = response;
        console.log(response[0].buyDate.getUTCDate)
      });
  }
}
