import { Injectable } from '@angular/core';

import { environment } from '../../enviroments/enviroment';
import { RouteModel } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private readonly API_URL = `${environment.apiUrl}api/routes`;

  constructor(private http: HttpClient) { }

  public add(route: RouteModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, route);
  }

  public update(route: RouteModel): Observable<Object> {
    return this.http.post(`${this.API_URL}/update`, route);
  }

  public getAll(): Observable<RouteModel[]> {
    return this.http.get<RouteModel[]>(`${this.API_URL}`);
  }

  public deleteRoute(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
