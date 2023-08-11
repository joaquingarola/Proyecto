import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneModel } from '../../models/zone-model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private readonly API_URL = 'https://localhost:7202/api/zones';

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

  public deleteCategory(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
