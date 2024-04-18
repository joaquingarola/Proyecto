import { Component, Inject } from '@angular/core';

import * as L from 'leaflet';

import { ContainerModel, NewRouteModel, OtherItems, RouteModel, SelectedItemType } from '../../../../models';
import { RouteService } from '../../../../services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-routes-form-modal',
  templateUrl: './routes-form-modal.component.html',
  styleUrls: ['./routes-form-modal.component.scss']
})
export class RoutesFormModalComponent {
  public routeForm: FormGroup;
  public containers: ContainerModel[];
  public containersWithoutRoute: OtherItems = { type: SelectedItemType.ContainerDisabled }; 
  public selectedContainers: Array<L.LatLng> = [];
  public error =  "";
  public isLoading = false;

  constructor( 
    private fb: FormBuilder,
    private routeService: RouteService,
    private _dialogRef: MatDialogRef<RoutesFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewRouteModel) {}

  ngOnInit(): void {
    this.containers = this.data.containers;
    this.containersWithoutRoute.itemsCoords = this.data.containersWithoutRoute;
    this.routeForm = this.fb.group({
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      periodicity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    if(this.data.route) { 
      this.routeForm.patchValue(this.data.route!);
      this.selectedContainers = this.data.route!.containers.map(container => L.latLng(container.latitude, container.longitude));
    }
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
    if (this.routeForm.valid) {
      this.isLoading = true;
      if (this.data.route) {
        const filteredContainers = this.containers.filter(x => this.selectedContainers.some(y => y.lat == x.latitude && y.lng == x.longitude));
        const route: RouteModel = { id: this.data.route.id, ...this.routeForm.value, containers: filteredContainers };
        this.routeService.update(route)
          .subscribe({
            next: () => this._dialogRef.close(true),
            error: (r) => {
              this.error = 'Ocurrió un error. Por favor intentelo más tarde.';
            }
          }).add(() => this.isLoading = false);
      } else {
        const filteredContainers = this.containers.filter(x => this.selectedContainers.some(y => y.lat == x.latitude && y.lng == x.longitude));
        const route: RouteModel = { ...this.routeForm.value, containers: filteredContainers };
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
    return this.selectedContainers.length < 5;
  }
}
