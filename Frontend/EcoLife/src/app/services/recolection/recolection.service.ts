import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { RecolectionCurrentStats, RecolectionHistoricStats, RecolectionModel, RecolectionResponseModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RecolectionService {

  private readonly API_URL = `${environment.apiUrl}api/recolections`;

  constructor(private http: HttpClient) { }

  public add(recolection: RecolectionModel): Observable<RecolectionResponseModel> {
    return this.http.post<RecolectionResponseModel>(`${this.API_URL}`, recolection);
  }

  public update(recolection: RecolectionModel): Observable<RecolectionResponseModel> {
    return this.http.post<RecolectionResponseModel>(`${this.API_URL}/update`, recolection);
  }

  public getAll(): Observable<RecolectionModel[]> {
    return this.http.get<RecolectionModel[]>(`${this.API_URL}`);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public getById(id: number): Observable<RecolectionModel> {
    return this.http.get<RecolectionModel>(`${this.API_URL}/${id}`);
  }

  public getByEmployeeId(id: number, type: string): Observable<RecolectionModel[]> {
    return this.http.get<RecolectionModel[]>(`${this.API_URL}/employee/${id}/${type}`);
  }

  public getInProgressByEmployeeId(id: number): Observable<RecolectionModel> {
    return this.http.get<RecolectionModel>(`${this.API_URL}/employee/${id}/in-progress`);
  }

  public startRecolection(id: number): Observable<Object> {
    return this.http.post(`${this.API_URL}/start/${id}`, null);
  }

  public completeRecolection(id: number): Observable<Object> {
    return this.http.post(`${this.API_URL}/complete/${id}`, null);
  }

  public cancelRecolection(id: number): Observable<Object> {
    return this.http.post(`${this.API_URL}/cancel/${id}`, null);
  }

  public wasteCenterReached(id: number): Observable<Object> {
    return this.http.post(`${this.API_URL}/waste-center/${id}`, null);
  }

  public validateInProgressRecolection(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/validate/${id}`);
  }

  public getHistoricStats(type: string): Observable<RecolectionHistoricStats> {
    return this.http.get<RecolectionHistoricStats>(`${this.API_URL}/historic-stats/${type}`);
  }

  public getCurrentStats(): Observable<RecolectionCurrentStats> {
    return this.http.get<RecolectionCurrentStats>(`${this.API_URL}/current-stats/`);
  }
}
