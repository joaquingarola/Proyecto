import * as L from 'leaflet';

import { AfterViewInit, Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { EmployeeService, RecolectionService, RouteService, VehicleCenterService, VehicleService, WasteCenterService } from '../../../../services';
import { EmployeeModel, VehicleCenterModel, VehicleModel, WasteCenterModel, NewRecolectionModel, RouteModel, RecolectionModel, RecolectionResponseModel } from '../../../../models';
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
  selectedDate = new Date();

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
      startDate: ['', [Validators.required]],
      estimatedStartTime: [{ value: '', disabled: true }, [Validators.required, this.minTimeValidator()]],
      estimatedEndTime: [{ value: '', disabled: true }, [Validators.required]]
    });

    this.getRoute();
    this.getRecolectors();

    this.recolectionForm.get('routeId')?.setValue(this.data.routeId);

    if(this.data.recolection) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    this.recolectionForm.get('description')?.setValue(this.data.recolection?.description);
    this.recolectionForm.get('startDate')?.setValue(this.data.recolection?.estimatedStartDate);
    this.recolectionForm.get('wasteCenterId')?.setValue(this.data.recolection?.wasteCenter.id);
    this.recolectionForm.get('vehicleCenterId')?.setValue(this.data.recolection?.vehicleCenter.id);
    this.recolectionForm.get('estimatedStartTime')?.setValue(this.getTime(this.data.recolection?.estimatedStartDate!));
    this.recolectionForm.get('estimatedEndTime')?.setValue(this.getTime(this.data.recolection?.estimatedEndDate!));
    if(this.data.recolection?.status != 'Vehículo pendiente') {
      this.recolectionForm.get('vehicle')?.setValue(this.data.recolection?.vehicle.id);
    } else {
      this.recolectionForm.get('vehicle')?.setValue('');
    }
    this.onStartDateChange();
  }

  private getTime(date: Date): string {
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`
  }

  private updateVehicleSelects(): void {
    if(this.data.recolection) {
      const coords = new L.LatLng(this.data.recolection?.vehicleCenter.latitude, this.data.recolection?.vehicleCenter.longitude);
      this.updateSelectedVehicleCenter(coords);
      this.onVehicleCenterChange();
      if(this.data.recolection.status != 'Vehículo pendiente') {
        this.selectedVehicle = this.vehicles.find(x => x.id == this.data.recolection?.vehicle.id)?.id!;
      }
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
        this.containersRoute = (response.containers ?? []).map(routeContainer => [routeContainer.latitude, routeContainer.longitude]);
        this.isLoadingRoute = false;
        this.getVehicleCenters();
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
        this.vehicles = response.filter(x => x.status == 'Disponible');
        this.isLoadingVehicleCenters = false;
        this.getWasteCenters();
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
        setTimeout(() => {
          this.updateWasteCenterSelect();
          this.updateVehicleSelects();
        }, 500);
      }
    );  
  } 

  onFormSubmit(): void {
    if (this.recolectionForm.valid) {
      this.isLoadingButton = true;
      if(this.data.recolection) {
        const status = this.data.recolection.status == 'Vehículo pendiente' ? 'Planificada' : this.data.recolection.status;
        const recolection: RecolectionModel = { id: this.data.recolection.id, ...this.recolectionForm.value, status: status };
        this.recolectionService.update(recolection).subscribe({
          next: (response: RecolectionResponseModel) => {
            if (response.success) {
              this._dialogRef.close(true);
            } else {
              this.error = response.message;
            }
          },
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoadingButton = false);
      } else {
        this.recolectionService.add(this.recolectionForm.value).subscribe({
          next: (response: RecolectionResponseModel) => {
            if (response.success) {
              this._dialogRef.close(true);
            } else {
              this.error = response.message;
            }
          },
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
        newRec.estimatedStartTime != this.getTime(oldRec.estimatedStartDate!) ||        
        newRec.estimatedEndTime != this.getTime(oldRec.estimatedEndDate!) ||
        new Date(newRec.startDate).getDate() != new Date(oldRec.estimatedStartDate!).getDate() 
    } else {
      return true;
    }
  }

  onStartDateChange(): void {
    if(this.recolectionForm.get('startDate')?.value != '') {
      this.recolectionForm.get('estimatedStartTime')?.enable();
      this.recolectionForm.get('estimatedEndTime')?.enable();
      this.selectedDate = new Date(this.recolectionForm.get('startDate')?.value);
      this.recolectionForm.get('estimatedStartTime')?.markAsTouched();
      this.recolectionForm.get('estimatedStartTime')?.updateValueAndValidity();
    }
  }

  private minTimeValidator(): ValidatorFn {
    let actualDate = new Date();
    const minToAdd = 60 - actualDate.getMinutes();
    actualDate = new Date(actualDate.getTime() + (minToAdd*60*1000));
    const minTime = `${this.padZero(actualDate.getHours())}:${this.padZero(actualDate.getMinutes())}:00`;

    return (control: AbstractControl): ValidationErrors | null => {
      if(`${this.selectedDate.getDay()}/${this.selectedDate.getMonth()}/${this.selectedDate.getFullYear()}` != `${actualDate.getDay()}/${actualDate.getMonth()}/${actualDate.getFullYear()}`) {
        return null;
      }

      const inputTime = control.value as string

      if (!inputTime) {
        return null
      };

      const minTimeObj = new Date(`1970-01-01T${minTime}`)
      const inputTimeObj = new Date(`1970-01-01T${inputTime}`)

      return inputTimeObj >= minTimeObj ? null : { minTime: true }
    }
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
