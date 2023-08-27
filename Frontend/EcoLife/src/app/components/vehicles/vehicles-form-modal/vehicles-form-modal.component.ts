import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleModel } from '../../../models/vehicle-model';

@Component({
  selector: 'app-vehicles-form-modal',
  templateUrl: './vehicles-form-modal.component.html',
  styleUrls: ['./vehicles-form-modal.component.scss']
})
export class VehiclesFormModalComponent {
  public vehicleForm: FormGroup;
  public actualDate = new Date();

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<VehiclesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleModel
  ) {
    this.vehicleForm = this.fb.group({
      patent: ['', [Validators.required]],
      description: ['', [Validators.required]],
      model: ['', [Validators.required]],
      buyDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.vehicleForm.patchValue(this.data);
  };

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
