import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { VehicleCenterService, VehicleService } from '../../../../services';
import { VehicleCenterModel, VehicleModel } from '../../../../models';

@Component({
  selector: 'app-vehicles-form-modal',
  templateUrl: './vehicles-form-modal.component.html',
  styleUrls: ['./vehicles-form-modal.component.scss']
})
export class VehiclesFormModalComponent {
  public vehicleForm: FormGroup;
  public vehicleCenters: VehicleCenterModel[];
  public selectedVehicleCenter: number;
  public actualDate = new Date();
  public error =  "";

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private vehicleCenterService: VehicleCenterService,
    private _dialogRef: MatDialogRef<VehiclesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleModel
  ) {
    this.vehicleForm = this.fb.group({
      patent: ['', [Validators.required, Validators.pattern('(^[A-Z]{2}\\d{3}[A-Z]{2}$)|(^[A-Z]{3}\\d{3}$)')]],
      description: ['', [Validators.required]],
      model: ['', [Validators.required]],
      buyDate: ['', [Validators.required]],
      vehicleCenterId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getVehicleCenters();
    this.vehicleForm.patchValue(this.data);
  };

  private getVehicleCenters(): void {
    this.vehicleCenterService.getAll()
      .subscribe(
        (response) => { 
          this.vehicleCenters = response;
          this.selectedVehicleCenter = this.data?.vehicleCenterId;
        }
      );
  }

  onFormSubmit(): void {
    if (this.vehicleForm.valid) {
      if (this.data) {
        const vehicle = this.vehicleForm.value;
        this.vehicleService
          .updateVehicle(this.data.id!, { ...vehicle, status: this.data.status })
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          });
      } else {
        this.vehicleService.add(this.vehicleForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        });
      }
    }
  };
}
