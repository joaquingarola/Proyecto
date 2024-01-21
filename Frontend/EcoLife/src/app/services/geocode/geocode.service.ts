import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordinatesModel } from '../../models';

import { NominatimPlaceModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private readonly API_URL_REVERSE = 'https://nominatim.openstreetmap.org/reverse?';

  constructor(private http: HttpClient) { }

  public getAddress(coords: CoordinatesModel): Observable<NominatimPlaceModel> {
    return this.http.get<NominatimPlaceModel>(`${this.API_URL_REVERSE}format=json&lat=${coords.latitude}&lon=${coords.longitude}&layer=address`);
  }
}
