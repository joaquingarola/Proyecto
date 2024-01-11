import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';

import { ContainerModel, ContainerSelection, CoordinatesModel, ZoneModel } from '../../../../models';
import { ContainerService, ZoneService } from '../../../../services';
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
  public containerCoords: L.LatLngTuple;
  public othersContainersCoords: Array<L.LatLngTuple>;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private zoneService: ZoneService,
    private _dialogRef: MatDialogRef<ContainerFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContainerSelection
  ) { }

  ngOnInit(): void {
    this.getZones();
    this.containerForm = this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      status: ['', [Validators.required]],
      zoneId: ['', [Validators.required]]
    });

    if(this.data.selectedContainer) {
      this.containerForm.patchValue(this.data.selectedContainer);
      this.containerCoords = [this.data.selectedContainer!.latitude, this.data.selectedContainer!.longitude];
    }

    if(this.data.othersContainers) {
      this.othersContainersCoords = (this.data.othersContainers ?? []).map(container => [container.latitude, container.longitude]);
    }
  }

  private getZones(): void{
    this.zoneService.getAll()
      .subscribe(
        (response) => { 
          this.zones = response;
          if(this.data.selectedContainer){
            this.selectedZone = this.data?.selectedContainer.zoneId;
          } 
        }
      );
  }

  onFormSubmit(): void {
    if (this.containerForm.valid) {
      this.isLoading = true;
      if (this.data.selectedContainer) {
        this.containerService
          .updateContainer(this.data.selectedContainer!.id!, this.containerForm.value)
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

  setNewCoords(coords: CoordinatesModel | null): void {
    if(coords) {
      this.containerForm.controls['latitude'].setValue(coords.latitude);
      this.containerForm.controls['longitude'].setValue(coords.longitude);
    } else {
      this.containerForm.controls['latitude'].setValue('');
      this.containerForm.controls['longitude'].setValue('');
    }
    this.containerForm.markAsDirty();
  }
}
