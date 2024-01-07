import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContainerModel, ZoneModel } from '../../../../models';
import { ContainerService, ZoneService } from '../../../../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ContainerStatus } from '../constants/container-status';
import { ContainerType } from '../constants/container-type';

@Component({
  selector: 'app-container-form-modal',
  templateUrl: './container-form-modal.component.html',
  styleUrls: ['./container-form-modal.component.scss']
})
export class ContainerFormModalComponent {
  public error =  "";
  public containerForm: FormGroup;
  public containerStatus = ContainerStatus;
  public selectedStatus: string;
  public containerTypes = ContainerType;
  public selectedType: string;
  public zones: ZoneModel[];
  public selectedZone: number;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private zoneService: ZoneService,
    private _dialogRef: MatDialogRef<ContainerFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContainerModel
  ) { }

  ngOnInit(): void {
    this.getZones();
    this.selectedStatus = this.containerStatus.find(s => s === this.data?.status) ?? this.containerStatus[0];
    this.selectedType = this.containerTypes.find(t => t === this.data?.wasteType) ?? this.containerTypes[0];
    this.containerForm = this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      lastEmptying: ['', [Validators.required]],
      status: ['', [Validators.required]],
      zoneId: ['', [Validators.required]]
    });
    this.containerForm.patchValue(this.data);
  }

  private getZones(): void{
    this.zoneService.getAll()
      .subscribe(
        (response) => { 
          this.zones = response;
          this.selectedZone = this.data?.zoneId;
        }
      );
  }

  onFormSubmit(): void {
    if (this.containerForm.valid) {
      this.isLoading = true;
      if (this.data) {
        this.containerService
          .updateContainer(this.data.id!, this.containerForm.value)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: (response: HttpErrorResponse) => {
              this.error = response.error;
            },
          }).add(() => this.isLoading = false);
      } else {
        this.containerService.add(this.containerForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: (response: HttpErrorResponse) => {
            this.error = response.error;
          },
        }).add(() => this.isLoading = false);
      }
    }
  };
}
