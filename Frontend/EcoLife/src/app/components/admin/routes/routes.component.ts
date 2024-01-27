import { Component } from '@angular/core';
import * as L from 'leaflet';

import { ContainerService } from '../../../services';
import { ContainerModel } from '../../../models';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  public showMap: boolean = false;
  public coordsList: L.LatLng[];

  constructor(
    private containerService: ContainerService){ }

  public planify(): void {
    this.containerService.getAll()
      .subscribe(
        (response) => {
          let last = response.length;
          /* this.mapCoordinates([response[0], response[last-1]]); */
          this.mapCoordinates(response);
          this.showMap = true;
        })    
  }

  private mapCoordinates(containers: ContainerModel[]): void {
    this.coordsList = containers.map(x => L.latLng(x.latitude, x.longitude));
  }
}
