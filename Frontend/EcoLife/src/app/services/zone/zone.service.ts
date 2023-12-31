import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ZoneModel } from '../../models/zone-model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private readonly API_URL = `${environment.apiUrl}api/zones`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ZoneModel[]> {
    return this.http.get<ZoneModel[]>(`${this.API_URL}`);
  }

  public getById(id: number): Observable<ZoneModel> {
    return this.http.get<ZoneModel>(`${this.API_URL}/${id}`);
  }

  public add(zone: ZoneModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, zone);
  }

  public deleteZone(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateZone(id: number, zone: ZoneModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...zone });
  }
}
