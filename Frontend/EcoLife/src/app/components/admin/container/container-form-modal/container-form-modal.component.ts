import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ContainerModel, ItemSelection, NominatimAddressModel, NominatimPlaceModel, OtherItems, SelectedItem, SelectedItemType } from '../../../../models';
import { ContainerService } from '../../../../services';
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
  public containerCoords: SelectedItem = { type: SelectedItemType.Container };
  public othersContainersCoords: OtherItems = { type: SelectedItemType.ContainerDisabled };
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private containerService: ContainerService,
    private _dialogRef: MatDialogRef<ContainerFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemSelection<ContainerModel>
  ) { }

  ngOnInit(): void {
    this.containerForm = this.fb.group({
      address: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      status: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    if(this.data.selectedItem) {
      this.containerForm.patchValue(this.data.selectedItem);
      this.containerCoords.itemCoords = [this.data.selectedItem!.latitude, this.data.selectedItem!.longitude];
    }

    if(this.data.othersItems) {
      this.othersContainersCoords.itemsCoords = (this.data.othersItems ?? []).map(container => [container.latitude, container.longitude]);
    }
  }

  onFormSubmit(): void {
    if (this.containerForm.valid) {
      this.isLoading = true;
      if (this.data.selectedItem) {
        const container: ContainerModel =  { ...this.data.selectedItem, ...this.containerForm.value };
        this.containerService
          .updateContainer(container)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          }).add(() => this.isLoading = false);
      } else {
        this.containerService.add(this.containerForm.value).subscribe({
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
      const address = `${location.address.road} ${location.address?.house_number}`;
      const zone = this.getZone(location.address);
      this.containerForm.controls['address'].setValue(address);
      this.containerForm.controls['zone'].setValue(zone);
      this.containerForm.controls['latitude'].setValue(location.lat);
      this.containerForm.controls['longitude'].setValue(location.lon);
    } else {
      this.containerForm.controls['address'].setValue('');
      this.containerForm.controls['zone'].setValue('');
      this.containerForm.controls['latitude'].setValue('');
      this.containerForm.controls['longitude'].setValue('');
    }
    this.containerForm.markAsDirty();
  }

  private getZone(address: NominatimAddressModel): string {
    if(address.city) {
      return address.city_district ? `${address.city_district}, ${address.city}` : address.city;
    }

    if(address.town) {
      return address.town;
    }

    if(address.village) {
      return address.village;
    }

    return '-';
  }
}
