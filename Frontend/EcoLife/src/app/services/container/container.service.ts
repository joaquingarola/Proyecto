import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { ContainerModel, RouteContainerModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  private readonly API_URL = `${environment.apiUrl}api/containers`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ContainerModel[]> {
    return this.http.get<ContainerModel[]>(`${this.API_URL}`);
  }

  public getAllWithoutRoute(): Observable<ContainerModel[]> {
    return this.http.get<ContainerModel[]>(`${this.API_URL}/without-route`);
  }

  public add(container: ContainerModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, container);
  }

  public deleteContainer(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateContainer(container: ContainerModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, container);
  }
}
