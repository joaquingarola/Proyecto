import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from '../../../services/maintenance/maintenance.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyMaintenanceFormModalComponent } from '../../vehicles/notify-maintenance-form-modal/notify-maintenance-form-modal.component';
import { FinishMaintenanceModel } from '../../../models/finish-maintenance-model';
import { MaintenanceModel } from '../../../models/maintenance-model';

@Component({
  selector: 'app-finish-maintenance-form-modal',
  templateUrl: './finish-maintenance-form-modal.component.html',
  styleUrls: ['./finish-maintenance-form-modal.component.scss']
})
export class FinishMaintenanceFormModalComponent {
  public maintenanceForm: FormGroup;
  public actualDate = new Date();

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private _dialogRef: MatDialogRef<NotifyMaintenanceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceModel
  ) {
    this.maintenanceForm = this.fb.group({
      endDate: ['', [Validators.required]]
    });
  }

  onFormSubmit(): void {
    if (this.maintenanceForm.valid) {
      const maintenance: FinishMaintenanceModel = this.maintenanceForm.value;
      this.maintenanceService.finishMaintenance(this.data.id!, maintenance)
        .subscribe({
          next: () => this._dialogRef.close(true),
          error: (err: any) => {
            console.error(err);
          }
        })
    };
  };
}
