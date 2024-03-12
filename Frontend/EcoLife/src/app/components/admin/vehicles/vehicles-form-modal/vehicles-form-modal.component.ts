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

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private vehicleCenterService: VehicleCenterService,
    private _dialogRef: MatDialogRef<VehiclesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleModel
  ) {
    this.vehicleForm = this.fb.group({
      patent: ['', [Validators.required]],
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
        this.vehicleService
          .updateVehicle(this.data.id!, this.vehicleForm.value)
          .subscribe({
            next: (val: any) => this._dialogRef.close(true),
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.vehicleService.add(this.vehicleForm.value).subscribe({
          next: (res: any) => this._dialogRef.close(true),
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  };
}
