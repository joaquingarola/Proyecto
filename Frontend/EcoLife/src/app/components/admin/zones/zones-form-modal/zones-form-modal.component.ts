import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ZoneService } from '../../../../services';
import { ZoneModel } from '../../../../models';

@Component({
  selector: 'app-zones-form-modal',
  templateUrl: './zones-form-modal.component.html',
  styleUrls: ['./zones-form-modal.component.scss']
})
export class ZonesFormModalComponent {
  public zoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private _dialogRef: MatDialogRef<ZonesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ZoneModel
  ) { }

  ngOnInit(): void {
    this.zoneForm = this.fb.group({
      description: ['', [Validators.required]],
      maximumHours: ['', [Validators.required]]
    });
    this.zoneForm.patchValue(this.data);
  }

  onFormSubmit(): void {
    if (this.zoneForm.valid) {
      if (this.data) {
        this.zoneService
          .updateZone(this.data.id!, this.zoneForm.value)
          .subscribe({
            next: (val: any) => this._dialogRef.close(true),
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.zoneService.add(this.zoneForm.value).subscribe({
          next: (res: any) => this._dialogRef.close(true),
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  };
}
