import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeModel, EmployeeResponseModel } from '../../models';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL = `${environment.apiUrl}api/employees`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.API_URL}`);
  }

  public getAllRecolectors(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.API_URL}/recolectors`);
  }

  public getById(id: number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.API_URL}/${id}`);
  }

  public add(employee: EmployeeModel): Observable<EmployeeResponseModel> {
    return this.http.post<EmployeeResponseModel>(`${this.API_URL}`, employee);
  }

  public deleteEmployee(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public updateEmployee(id: number, employee: EmployeeModel): Observable<EmployeeResponseModel> {
    return this.http.put<EmployeeResponseModel>(`${this.API_URL}`, { id: id, ...employee });
  }
}
