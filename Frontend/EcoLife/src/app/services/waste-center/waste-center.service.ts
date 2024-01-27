import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { WasteCenterModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class WasteCenterService {
  private readonly API_URL = `${environment.apiUrl}api/waste-center`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<WasteCenterModel[]> {
    return this.http.get<WasteCenterModel[]>(`${this.API_URL}`);
  }

  public add(wasteCenter: WasteCenterModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, wasteCenter);
  }

  public deleteWasteCenter(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateWasteCenter(id: number, wasteCenter: WasteCenterModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...wasteCenter });
  }
}
