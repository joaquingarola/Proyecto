import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { RecolectionModel, RecolectionResponseModel } from '../../models';

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
}
