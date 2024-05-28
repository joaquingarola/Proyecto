import * as L from 'leaflet';

import { AfterViewInit, Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { EmployeeService, RecolectionService, RouteService, VehicleCenterService, VehicleService, WasteCenterService } from '../../../../services';
import { EmployeeModel, VehicleCenterModel, VehicleModel, WasteCenterModel, NewRecolectionModel, RouteModel, RecolectionModel } from '../../../../models';
@Component({
  selector: 'app-planify-recolection',
  templateUrl: './planify-recolection.component.html',
  styleUrls: ['./planify-recolection.component.scss']
})
export class PlanifyRecolectionComponent {
  public containersRoute: Array<L.LatLngTuple>; 
  public employees: EmployeeModel[];
  public route: RouteModel;
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
  public isLoadingButton = false;
  public isLoadingWasteCenters = true;
  public isLoadingVehicleCenters = true;
  public isLoadingRoute = true;
  public actualDate = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private vehicleService: VehicleService,
    private vehicleCenterService: VehicleCenterService,
    private wasteCenterService: WasteCenterService,
    private recolectionService: RecolectionService,
    private routeService: RouteService,
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

    this.getRoute();
    this.getRecolectors();
    this.getVehicleCenters();
    this.getWasteCenters();

    this.recolectionForm.get('routeId')?.setValue(this.data.routeId);

    if(this.data.recolection) {
      this.updateForm();
    }

    setTimeout(() => {
      this.updateWasteCenterSelect();
      this.updateVehicleSelects();
      this.recolectionForm.markAsPristine();
    }, 500);
  }

  private updateForm(): void {
    this.recolectionForm.get('description')?.setValue(this.data.recolection?.description);
    this.recolectionForm.get('startDate')?.setValue(this.data.recolection?.startDate);
    this.recolectionForm.get('wasteCenterId')?.setValue(this.data.recolection?.wasteCenter.id);
    this.recolectionForm.get('vehicleCenterId')?.setValue(this.data.recolection?.vehicleCenter.id);
    this.recolectionForm.get('vehicleId')?.setValue(this.data.recolection?.vehicle.id);
  }

  private updateVehicleSelects(): void {
    if(this.data.recolection) {
      const coords = new L.LatLng(this.data.recolection?.vehicleCenter.latitude, this.data.recolection?.vehicleCenter.longitude);
      this.updateSelectedVehicleCenter(coords);
      this.onVehicleCenterChange();
      this.selectedVehicle = this.vehicles.find(x => x.id == this.data.recolection?.vehicle.id)?.id!;
    }
  }

  private updateWasteCenterSelect(): void {
    if(this.data.recolection) {
      const coords = new L.LatLng(this.data.recolection?.wasteCenter.latitude, this.data.recolection?.wasteCenter.longitude);
      this.updateSelectedWasteCenter(coords);
      this.onWasteCenterChange();
    }
  }

  private updateEmployeeSelect(): void {
    if(this.data.recolection) {
      this.recolectionForm.get('employeeId')?.setValue(this.data.recolection.employee.id!);
    }
  }

  private getRoute(): void {
    this.routeService.getById(this.data.routeId)
    .subscribe(
      (response) => {
        this.route = response;
        this.containersRoute = (response.containers ?? []).map(container => [container.latitude, container.longitude]);
        this.isLoadingRoute = false;
      }
    );  
  }

  private getRecolectors(): void {
    this.employeeService.getAllRecolectors()
    .subscribe(
      (response) => {
        this.employees = response;
        this.updateEmployeeSelect();
      }
    ); 
  }

  private getVehicles(): void {
    this.vehicleService.getAll()
    .subscribe(
      (response) => {
        this.vehicles = response;
        this.isLoadingVehicleCenters = false;
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

  private getVehicleCenters(): void {
    this.vehicleCenterService.getAll()
    .subscribe(
      (response) => {
        this.vehicleCenters = response;
        this.vehicleCentersCoords = (response ?? []).map(container => [container.latitude, container.longitude]);
        this.getVehicles();
      }
    );  
  }

  private getWasteCenters(): void {
    this.wasteCenterService.getAll()
    .subscribe(
      (response) => {
        this.wasteCenters = response;
        this.wasteCentersCoords = (response ?? []).map(container => [container.latitude, container.longitude]);
        this.isLoadingWasteCenters = false;
      }
    );  
  } 

  onFormSubmit(): void {
    if (this.recolectionForm.valid) {
      this.isLoadingButton = true;
      if(this.data.recolection) {
        const recolection: RecolectionModel = { id: this.data.recolection.id, ...this.recolectionForm.value, status: this.data.recolection.status };
        this.recolectionService.update(recolection).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoadingButton = false);
      } else {
        this.recolectionService.add(this.recolectionForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoadingButton = false);
      }
    }
  };

  isLoadingEntities(): boolean {
    return this.isLoadingWasteCenters || this.isLoadingVehicleCenters || this.isLoadingRoute;
  }

  isRecoletionDifferent(): boolean {
    if(this.data.recolection) {
      const newRec = { ...this.recolectionForm.value };
      const oldRec = this.data.recolection;

      return newRec.description != oldRec.description ||
        newRec.vehicleCenterId != oldRec.vehicleCenter.id ||
        newRec.vehicleId != oldRec.vehicle.id ||
        newRec.wasteCenterId != oldRec.wasteCenter.id ||
        newRec.employeeId != oldRec.employee.id ||
        new Date(newRec.startDate).getDate() != new Date(oldRec.startDate).getDate() 
    } else {
      return true;
    }
  }
}
