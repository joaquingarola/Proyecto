import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { EmployeeService, RecolectionService, VehicleCenterService, VehicleService, WasteCenterService } from '../../../../services';
import { EmployeeModel, VehicleCenterModel, VehicleModel, WasteCenterModel, NewRecolectionModel } from '../../../../models';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-planify-recolection',
  templateUrl: './planify-recolection.component.html',
  styleUrls: ['./planify-recolection.component.scss']
})
export class PlanifyRecolectionComponent {
  public containersRoute: Array<L.LatLngTuple>; 
  public employees: EmployeeModel[];
  public selectedEmployee: number;
  public vehicles: VehicleModel[];
  public vehiclesByCenter: VehicleModel[];
  public selectedVehicle: number;
  public wasteCenters: WasteCenterModel[];
  public wasteCentersCoords: L.LatLngTuple[];
  public selectedWasteCenter: number | null;
  public updateWasteCenterByForm: L.LatLngTuple;
  public vehicleCenters: VehicleCenterModel[];
  public vehicleCentersCoords: L.LatLngTuple[];
  public selectedVehicleCenter: number | null;
  public updateVehicleCenterByForm: L.LatLngTuple;
  public error =  "";
  public recolectionForm: FormGroup;
  public isLoading = false
  public actualDate = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private vehicleService: VehicleService,
    private vehicleCenterService: VehicleCenterService,
    private wasteCenterService: WasteCenterService,
    private recolectionService: RecolectionService,
    private _dialogRef: MatDialogRef<PlanifyRecolectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewRecolectionModel) { }

  ngOnInit(): void {
    this.recolectionForm = this.fb.group({
      routeId: ['', [Validators.required]],
      wasteCenterId: ['', [Validators.required]],
      vehicleCenterId: ['', [Validators.required]],
      vehicleId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]]
    });

    this.mapContainers();
    this.getEmployees();
    this.getVehicles();
    this.getVehicleCenters();
    this.getWasteCenters();

    this.recolectionForm.get('routeId')?.setValue(this.data.route!.id);
  }

  private mapContainers(): void {
    this.containersRoute = (this.data.route?.containers ?? []).map(container => [container.latitude, container.longitude]);
    console.log(this.containersRoute)
  }

  private getEmployees(): void {
    this.employeeService.getAll()
    .subscribe(
      (response) => {
        this.employees = response;
      }
    ); 
  }

  private getVehicles(): void {
    this.vehicleService.getAll()
    .subscribe(
      (response) => {
        this.vehicles = response;
      }
    ); 
  }

  public updateSelectedWasteCenter(coords: L.LatLng | null): void {
    if(coords) { 
      this.selectedWasteCenter = this.wasteCenters.find(x => x.latitude == coords.lat && x.longitude == coords.lng)?.id!;
    } else {
      this.selectedWasteCenter = null;
    }
  }

  public onWasteCenterChange(): void {
    const wasteCenter = this.wasteCenters.find(x => x.id == this.selectedWasteCenter);
    this.updateWasteCenterByForm = [wasteCenter!.latitude, wasteCenter!.longitude];
  }

  public updateSelectedVehicleCenter(coords: L.LatLng | null): void {
    if(coords) { 
      this.selectedVehicleCenter = this.vehicleCenters.find(x => x.latitude == coords.lat && x.longitude == coords.lng)?.id!;
    } else {
      this.selectedVehicleCenter = null;
    }
    this.updateVehiclesByCenter();
  }

  public onVehicleCenterChange(): void {
    this.updateVehiclesByCenter();
    const vehicleCenter = this.vehicleCenters.find(x => x.id == this.selectedVehicleCenter);
    this.updateVehicleCenterByForm = [vehicleCenter!.latitude, vehicleCenter!.longitude];
  }

  private updateVehiclesByCenter(): void {
    this.recolectionForm.get('vehicleId')?.setValue('');
    this.vehiclesByCenter = this.vehicles.filter(x => x.vehicleCenter?.id == this.selectedVehicleCenter);
  }
  
    /* public planify(): void {
    this.containerService.getAll()
      .subscribe(
        (response) => {
          this.coordsList = response.map(x => L.latLng(x.latitude, x.longitude));
          this.showMap = true;
        })    
  }*/

  private getVehicleCenters(): void {
    this.vehicleCenterService.getAll()
    .subscribe(
      (response) => {
        this.vehicleCenters = response;
        this.vehicleCentersCoords = (response ?? []).map(container => [container.latitude, container.longitude]);
      }
    );  
  }

  private getWasteCenters(): void {
    this.wasteCenterService.getAll()
    .subscribe(
      (response) => {
        this.wasteCenters = response;
        this.wasteCentersCoords = (response ?? []).map(container => [container.latitude, container.longitude]);
      }
    );  
  } 

  onFormSubmit(): void {
    if (this.recolectionForm.valid) {
      this.isLoading = true;
      this.recolectionService.add(this.recolectionForm.value).subscribe({
        next: () => this._dialogRef.close(true),
        error: (response: HttpErrorResponse) => {
          this.error = response.error;
        },
      }).add(() => this.isLoading = false);
    }
  };
}
