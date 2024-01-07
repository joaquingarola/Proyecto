import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoleModel } from '../../models';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly API_URL = `${environment.apiUrl}api/roles`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.API_URL}`);
  }
}