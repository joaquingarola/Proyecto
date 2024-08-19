import { Component, Inject } from '@angular/core';

import * as L from 'leaflet';

import { ContainerModel, OtherItems, RouteModel, SelectedItemType } from '../../../../models';
import { ContainerService, RouteService } from '../../../../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContainerType } from '../../container/constants/container-type';

@Component({
  selector: 'app-routes-form-modal',
  templateUrl: './routes-form-modal.component.html',
  styleUrls: ['./routes-form-modal.component.scss']
})
export class RoutesFormModalComponent {
  public routeForm: FormGroup;
  public containers: ContainerModel[];
  public containerTypes = ContainerType;
  public selectedType: string;
  public inorganicContainersWithoutRoute: OtherItems = { type: SelectedItemType.ContainerDisabled }; 
  public organicContainersWithoutRoute: OtherItems = { type: SelectedItemType.ContainerDisabled }; 
  public selectedContainers: Array<L.LatLng> = [];
  public error =  "";
  public isLoading = false;
  public isLoadingContainers = false;

  constructor( 
    private fb: FormBuilder,
    private routeService: RouteService,
    private containerService: ContainerService,
    private _dialogRef: MatDialogRef<RoutesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RouteModel) {}

  ngOnInit(): void {
    this.isLoadingContainers = true;

    this.routeForm = this.fb.group({
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      wasteType: ['', [Validators.required]],
      periodicity: [0, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    this.routeForm.controls['wasteType'].setValue(ContainerType[0]);
    this.selectedType = ContainerType[0];

    if(this.data) { 
      this.routeForm.patchValue(this.data!);
      this.selectedContainers = this.data!.containers.map(routeContainer => L.latLng(routeContainer.latitude, routeContainer.longitude));
      this.selectedType = ContainerType.find(x => x == this.data.wasteType)!;
    }

    this.getContainers();
  }

  public containerClick(coords: L.LatLng): void {
    const index = this.selectedContainers.findIndex(x => x.lat == coords.lat && x.lng == coords.lng);

    if(index == -1) {
      this.selectedContainers.push(coords);
    } else {
      this.selectedContainers.splice(index, 1);
    }

    this.routeForm.controls['quantity'].setValue(this.selectedContainers.length);
    this.routeForm.markAsDirty();
  }

  onFormSubmit(): void {
    const routeContainers: ContainerModel[] = [];
    const filteredContainers = this.containers.filter(x => this.selectedContainers.some(y => y.lat == x.latitude && y.lng == x.longitude));
    routeContainers.push(...filteredContainers);
    if (this.routeForm.valid) {
      this.isLoading = true;
      if (this.data) {
        const route: RouteModel = { id: this.data.id, ...this.routeForm.value, containers: routeContainers };
        this.routeService.update(route)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: (r) => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            }
          }).add(() => this.isLoading = false);
      } else {
        const route: RouteModel = { ...this.routeForm.value, containers: routeContainers };
        this.routeService.add(route)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: () => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            },
          }).add(() => this.isLoading = false);
      }
    }
  };

  quantitySelectedValid(): boolean {
    return this.selectedContainers.length < 1;
  }

  private getContainers(): void {
    this.containerService.getAllWithoutRoute()
      .subscribe(
        (response) => {
          const routeContainers = this.data?.containers ?? [];
          this.containers = [...response, ...routeContainers];
          this.organicContainersWithoutRoute.itemsCoords = response.filter(x => x.wasteType == ContainerType[0]).map(x => [x.latitude, x.longitude]);
          this.inorganicContainersWithoutRoute.itemsCoords = response.filter(x => x.wasteType == ContainerType[1]).map(x => [x.latitude, x.longitude]);
        })
      .add(() => this.isLoadingContainers = false);  
  }

  public getContainersMap(): OtherItems {
    return this.selectedType == ContainerType[0] ? this.organicContainersWithoutRoute : this.inorganicContainersWithoutRoute;
  }
}
