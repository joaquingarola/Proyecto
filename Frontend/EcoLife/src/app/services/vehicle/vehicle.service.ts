import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../../models/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API_URL = 'https://localhost:7202/api/vehicles';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${this.API_URL}`);
  }

  public getById(id: number): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${this.API_URL}/${id}`);
  }

  public add(vehicle: VehicleModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, vehicle);
  }

  public deleteCategory(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateVehicle(id: number, vehicle: VehicleModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...vehicle });
  }
}
