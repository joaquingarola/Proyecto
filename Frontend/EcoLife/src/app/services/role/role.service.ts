import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoleModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly API_URL = 'https://localhost:7202/api/roles';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.API_URL}`);
  }
}