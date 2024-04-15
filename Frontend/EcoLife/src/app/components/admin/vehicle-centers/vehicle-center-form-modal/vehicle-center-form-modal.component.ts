import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';

import { VehicleCenterModel, ItemSelection, NominatimPlaceModel } from '../../../../models';
import { VehicleCenterService } from '../../../../services';

@Component({
  selector: 'app-vehicle-center-form-modal',
  templateUrl: './vehicle-center-form-modal.component.html',
  styleUrls: ['./vehicle-center-form-modal.component.scss']
})
export class VehicleCenterFormModalComponent {
  public error =  "";
  public vehicleCenterForm: FormGroup;
  public vehicleCenterCoords: L.LatLngTuple;
  public othersVehicleCenterCoords: Array<L.LatLngTuple>;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private vehicleCenterService: VehicleCenterService,
    private _dialogRef: MatDialogRef<VehicleCenterFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemSelection<VehicleCenterModel>
  ) { }

  ngOnInit(): void {
    this.vehicleCenterForm = this.fb.group({
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    if(this.data.selectedItem) {
      this.vehicleCenterForm.patchValue(this.data.selectedItem);
      this.vehicleCenterCoords = [this.data.selectedItem!.latitude, this.data.selectedItem!.longitude];
    }

    if(this.data.othersItems) {
      this.othersVehicleCenterCoords = (this.data.othersItems ?? []).map(container => [container.latitude, container.longitude]);
    }
  }

  onFormSubmit(): void {
    if (this.vehicleCenterForm.valid) {
      this.isLoading = true;
      if (this.data.selectedItem) {
        this.vehicleCenterService
          .updateVehicleCenter(this.data.selectedItem!.id!, this.vehicleCenterForm.value)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          }).add(() => this.isLoading = false);
      } else {
        this.vehicleCenterService.add(this.vehicleCenterForm.value).subscribe({
          next: () => this._dialogRef.close(true),
          error: () => {
            this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
          },
        }).add(() => this.isLoading = false);
      }
    }
  };

  setNewCoords(location: NominatimPlaceModel | null): void {
    if(location) {
      let address = `${location.address.road} ${location.address?.house_number}, ${location.address.city}`
      this.vehicleCenterForm.controls['address'].setValue(address);
      this.vehicleCenterForm.controls['latitude'].setValue(location.lat);
      this.vehicleCenterForm.controls['longitude'].setValue(location.lon);
    } else {
      this.vehicleCenterForm.controls['address'].setValue('');
      this.vehicleCenterForm.controls['latitude'].setValue('');
      this.vehicleCenterForm.controls['longitude'].setValue('');
    }
    this.vehicleCenterForm.markAsDirty();
  }
}
