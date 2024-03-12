import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { RecolectionModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RecolectionService {

  private readonly API_URL = `${environment.apiUrl}api/recolections`;

  constructor(private http: HttpClient) { }

  public add(recolection: RecolectionModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, recolection);
  }
}
