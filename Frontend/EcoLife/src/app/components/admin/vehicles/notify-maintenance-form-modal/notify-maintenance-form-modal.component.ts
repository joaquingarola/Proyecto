import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { VehicleModel, MaintenanceModel } from '../../../../models';
import { MaintenanceService } from '../../../../services';

@Component({
  selector: 'app-notify-maintenance-form-modal',
  templateUrl: './notify-maintenance-form-modal.component.html',
  styleUrls: ['./notify-maintenance-form-modal.component.scss']
})
export class NotifyMaintenanceFormModalComponent {
  public maintenanceForm: FormGroup;
  public error =  "";

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private _dialogRef: MatDialogRef<NotifyMaintenanceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleModel
  ) {
    this.maintenanceForm = this.fb.group({
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]]
    });
  }

  onFormSubmit(): void {
    if (this.maintenanceForm.valid) {
      const maintenance: MaintenanceModel = this.maintenanceForm.value;
      maintenance.vehicleId = this.data.id!;
      this.maintenanceService.add(maintenance)
        .subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          }
        })
    };
  };
}
