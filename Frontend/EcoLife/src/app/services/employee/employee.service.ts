import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API_URL = 'https://localhost:7202/api/employees';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.API_URL}`);
  }

  public getById(id: number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.API_URL}/${id}`);
  }

  public add(employee: EmployeeModel): Observable<Object> {
    return this.http.post(`${this.API_URL}`, employee);
  }

  public deleteEmployee(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateEmployee(id: number, employee: EmployeeModel): Observable<Object> {
    return this.http.put(`${this.API_URL}`, { id: id, ...employee });
  }
}
