import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';

import { ContainerModel, ItemSelection, NominatimPlaceModel, ZoneModel } from '../../../../models';
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
    @Inject(MAT_DIALOG_DATA) public data: ItemSelection<ContainerModel>
  ) { }

  ngOnInit(): void {
    this.getZones();
    this.containerForm = this.fb.group({
      address: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      status: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    if(this.data.selectedItem) {
      this.containerForm.patchValue(this.data.selectedItem);
      this.containerCoords = [this.data.selectedItem!.latitude, this.data.selectedItem!.longitude];
    }

    if(this.data.othersItems) {
      this.othersContainersCoords = (this.data.othersItems ?? []).map(container => [container.latitude, container.longitude]);
    }
  }

  private getZones(): void{
    this.zoneService.getAll()
      .subscribe(
        (response) => { 
          this.zones = response;
          if(this.data.selectedItem){
            this.selectedZone = this.data?.selectedItem.zoneId;
          } 
        }
      );
  }

  onFormSubmit(): void {
    if (this.containerForm.valid) {
      this.isLoading = true;
      if (this.data.selectedItem) {
        this.containerService
          .updateContainer(this.data.selectedItem!.id!, this.containerForm.value)
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

  setNewCoords(location: NominatimPlaceModel | null): void {
    if(location) {
      let address = `${location.address.road} ${location.address?.house_number}, ${location.address.city}`
      this.containerForm.controls['address'].setValue(address);
      this.containerForm.controls['latitude'].setValue(location.lat);
      this.containerForm.controls['longitude'].setValue(location.lon);
    } else {
      this.containerForm.controls['address'].setValue('');
      this.containerForm.controls['latitude'].setValue('');
      this.containerForm.controls['longitude'].setValue('');
    }
    this.containerForm.markAsDirty();
  }
}
