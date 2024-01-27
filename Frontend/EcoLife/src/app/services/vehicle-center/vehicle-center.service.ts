import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { VehicleCenterModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class VehicleCenterService {
  private readonly API_URL = `${environment.apiUrl}api/vehicle-center`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<VehicleCenterModel[]> {
    return this.http.get<VehicleCenterModel[]>(`${this.API_URL}`);
  }

  public add(vehicleCenter: VehicleCenterModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, vehicleCenter);
  }

  public deleteVehicleCenter(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateVehicleCenter(id: number, vehicleCenter: VehicleCenterModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...vehicleCenter });
  }
}
