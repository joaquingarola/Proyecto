import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinishMaintenanceModel } from 'src/app/models/finish-maintenance-model';
import { MaintenanceModel } from 'src/app/models/maintenance-model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private readonly API_URL = 'https://localhost:7202/api/maintenance';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<MaintenanceModel[]> {
    return this.http.get<MaintenanceModel[]>(`${this.API_URL}`);
  }

  public getById(id: number): Observable<MaintenanceModel> {
    return this.http.get<MaintenanceModel>(`${this.API_URL}/${id}`);
  }

  public add(maintenance: MaintenanceModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, maintenance);
  }

  public finishMaintenance(id: number, maintenance: FinishMaintenanceModel): Observable<Object>{
    return this.http.post(`${this.API_URL}/complete/${id}`, maintenance)
  }

  public deleteMaintenance(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateMaintenance(id: number, maintenance: MaintenanceModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...maintenance });
  }
}
