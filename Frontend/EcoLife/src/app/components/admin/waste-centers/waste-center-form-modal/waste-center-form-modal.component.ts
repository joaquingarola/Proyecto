import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';

import { WasteCenterModel, ItemSelection, NominatimPlaceModel } from '../../../../models';
import { WasteCenterService } from '../../../../services';
import { ContainerType } from '../../container/constants/container-type';

@Component({
  selector: 'app-waste-center-form-modal',
  templateUrl: './waste-center-form-modal.component.html',
  styleUrls: ['./waste-center-form-modal.component.scss']
})
export class WasteCenterFormModalComponent {
  public error =  "";
  public wasteCenterForm: FormGroup;
  public containerTypes = ContainerType;
  public selectedType: string;
  public wasteCenterCoords: L.LatLngTuple;
  public othersWasteCenterCoords: Array<L.LatLngTuple>;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private wasteCenterService: WasteCenterService,
    private _dialogRef: MatDialogRef<WasteCenterFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemSelection<WasteCenterModel>
  ) { }

  ngOnInit(): void {
    this.wasteCenterForm = this.fb.group({
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    if(this.data.selectedItem) {
      this.wasteCenterForm.patchValue(this.data.selectedItem);
      this.wasteCenterCoords = [this.data.selectedItem!.latitude, this.data.selectedItem!.longitude];
    }

    if(this.data.othersItems) {
      this.othersWasteCenterCoords = (this.data.othersItems ?? []).map(container => [container.latitude, container.longitude]);
    }
  }

  onFormSubmit(): void {
    if (this.wasteCenterForm.valid) {
      this.isLoading = true;
      if (this.data.selectedItem) {
        this.wasteCenterService
          .updateWasteCenter(this.data.selectedItem!.id!, this.wasteCenterForm.value)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: (response: HttpErrorResponse) => {
              this.error = response.error;
            },
          }).add(() => this.isLoading = false);
      } else {
        this.wasteCenterService.add(this.wasteCenterForm.value).subscribe({
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
      this.wasteCenterForm.controls['address'].setValue(address);
      this.wasteCenterForm.controls['latitude'].setValue(location.lat);
      this.wasteCenterForm.controls['longitude'].setValue(location.lon);
    } else {
      this.wasteCenterForm.controls['address'].setValue('');
      this.wasteCenterForm.controls['latitude'].setValue('');
      this.wasteCenterForm.controls['longitude'].setValue('');
    }
    this.wasteCenterForm.markAsDirty();
  }
}
