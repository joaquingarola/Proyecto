import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from '../../../../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceModel } from '../../../../models';

@Component({
  selector: 'app-edit-maintenance-form-modal',
  templateUrl: './edit-maintenance-form-modal.component.html',
  styleUrls: ['./edit-maintenance-form-modal.component.scss']
})
export class EditMaintenanceFormModalComponent {
  public maintenanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private _dialogRef: MatDialogRef<EditMaintenanceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceModel
  ) { }

  ngOnInit(): void {
    this.maintenanceForm = this.fb.group({
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]]
    });
    this.maintenanceForm.patchValue(this.data);
  }

  onFormSubmit(): void {
    if (this.maintenanceForm.valid) {
      const maintenance: MaintenanceModel = this.maintenanceForm.value;
      maintenance.vehicleId = this.data.id!;
      this.maintenanceService
        .updateMaintenance(this.data.id!, maintenance)
        .subscribe({
          next: () => this._dialogRef.close(true),
          error: (err: any) => console.error(err)
        });
    } 
  };
}
